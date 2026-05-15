export interface Point {
  name: string;
  type: string[];
  status: string;
  location: {
    longitude: number;
    latitude: number;
  };
  location_type: string;
  location_description: string | null;
  opening_hours: string;
  address: {
    line1: string;
    line2: string;
  };
  address_details: {
    city: string;
    province: string;
    post_code: string;
    street: string;
    building_number: string;
  };
  functions: string[];
  image_url: string | null;
  easy_access_zone: boolean;
  locker_availability: {
    status: string;
    details: {
      A: string;
      B: string;
      C: string;
    };
  };
}

export interface PointsResponse {
  count: number;
  page: number;
  per_page: number;
  total_pages: number;
  items: Point[];
}

export type PointType = "parcel_locker" | "parcel_locker_superpop" | "pop";
