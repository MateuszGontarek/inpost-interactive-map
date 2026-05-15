"use client";

import type { Point } from "@/types/inpost";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  points: Point[];
  totalCount: number;
  search: string;
  onSearch: (v: string) => void;
  selected: Point | null;
  onSelect: (p: Point) => void;
  filterEasyAccess: boolean;
  onFilterEasyAccess: (v: boolean) => void;
  filterOpen247: boolean;
  onFilterOpen247: (v: boolean) => void;
}

export function Sidebar({
  points,
  totalCount,
  search,
  onSearch,
  selected,
  onSelect,
  filterEasyAccess,
  onFilterEasyAccess,
  filterOpen247,
  onFilterOpen247,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.searchWrap}>
        <div className={styles.searchIcon}>🔍</div>
        <input
          className={styles.search}
          type="text"
          placeholder="Szukaj miasta, ulicy, kodu..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => onSearch("")}>
            ✕
          </button>
        )}
      </div>

      <div className={styles.filters}>
        <label className={styles.filterChip}>
          <input
            type="checkbox"
            checked={filterOpen247}
            onChange={(e) => onFilterOpen247(e.target.checked)}
          />
          <span>24/7</span>
        </label>
        <label className={styles.filterChip}>
          <input
            type="checkbox"
            checked={filterEasyAccess}
            onChange={(e) => onFilterEasyAccess(e.target.checked)}
          />
          <span>♿ Łatwy dostęp</span>
        </label>
      </div>

      <div className={styles.resultsBar}>
        <span>
          {search || filterEasyAccess || filterOpen247
            ? `${points.length.toLocaleString("pl-PL")} wyników`
            : `${totalCount.toLocaleString("pl-PL")} paczkomatów`}
        </span>
      </div>

      <ul className={styles.list}>
        {points.slice(0, 200).map((point) => (
          <li
            key={point.name}
            className={`${styles.item} ${selected?.name === point.name ? styles.itemActive : ""}`}
            onClick={() => onSelect(point)}
          >
            <div className={styles.itemIcon}>📦</div>
            <div className={styles.itemBody}>
              <div className={styles.itemTop}>
                <span className={styles.itemName}>{point.name}</span>
                {point.opening_hours === "24/7" && (
                  <span className={styles.tag247}>24/7</span>
                )}
              </div>
              <p className={styles.itemAddr}>
                {point.address.line1}, {point.address_details.city}
              </p>
              {point.location_description && (
                <p className={styles.itemDesc}>{point.location_description}</p>
              )}
            </div>
          </li>
        ))}
        {points.length > 200 && (
          <li className={styles.moreInfo}>
            Zawęź wyszukiwanie, aby zobaczyć więcej wyników ({points.length - 200} ukrytych)
          </li>
        )}
        {points.length === 0 && (
          <li className={styles.empty}>Brak wyników dla &ldquo;{search}&rdquo;</li>
        )}
      </ul>
    </aside>
  );
}
