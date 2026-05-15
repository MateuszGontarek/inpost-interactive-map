import type { PointsResponse, PointType } from "@/types/inpost";

const BASE_URL = "https://api-global-points.easypack24.net/v1/points";

export interface FetchPointsOptions {
  city?: string;
  type?: PointType;
  page?: number;
  perPage?: number;
}

export async function fetchPoints(
  options: FetchPointsOptions = {}
): Promise<PointsResponse> {
  const { city, type = "parcel_locker", page = 1, perPage = 100 } = options;

  const params = new URLSearchParams({
    country: "PL",
    type,
    page: String(page),
    per_page: String(perPage),
    ...(city ? { city } : {}),
  });

  const res = await fetch(`${BASE_URL}?${params}`, {
    next: { revalidate: 300 }, // cache 5 min
  });

  if (!res.ok) {
    throw new Error(`InPost API error: ${res.status}`);
  }

  return res.json();
}

export async function fetchAllPoints(city?: string): Promise<PointsResponse> {
  // First page to know total
  const first = await fetchPoints({ city, perPage: 100, page: 1 });

  if (first.total_pages <= 1) return first;

  // Fetch remaining pages in parallel (cap at 5 pages = 500 points for MVP)
  const maxPages = Math.min(first.total_pages, 5);
  const pageNums = Array.from({ length: maxPages - 1 }, (_, i) => i + 2);

  const rest = await Promise.all(
    pageNums.map((p) => fetchPoints({ city, perPage: 100, page: p }))
  );

  return {
    ...first,
    items: [first.items, ...rest.map((r) => r.items)].flat(),
  };
}
