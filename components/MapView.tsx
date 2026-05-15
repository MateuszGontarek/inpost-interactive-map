"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import type { Point } from "@/types/inpost";
import { Sidebar } from "./Sidebar";
import styles from "./MapView.module.css";

const Map = dynamic(() => import("./Map"), { ssr: false, loading: () => <div className={styles.mapLoading}><span className={styles.spinner} /></div> });

interface MapViewProps {
  initialPoints: Point[];
  totalCount: number;
}

export function MapView({ initialPoints, totalCount }: MapViewProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Point | null>(null);
  const [filterEasyAccess, setFilterEasyAccess] = useState(false);
  const [filterOpen247, setFilterOpen247] = useState(false);

  const filtered = useMemo(() => {
    return initialPoints.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.address_details.city.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.address.line1.toLowerCase().includes(q);
      const matchEasy = !filterEasyAccess || p.easy_access_zone;
      const matchOpen = !filterOpen247 || p.opening_hours === "24/7";
      return matchSearch && matchEasy && matchOpen;
    });
  }, [initialPoints, search, filterEasyAccess, filterOpen247]);

  return (
    <div className={styles.layout}>
      <Sidebar
        points={filtered}
        totalCount={totalCount}
        search={search}
        onSearch={setSearch}
        selected={selected}
        onSelect={setSelected}
        filterEasyAccess={filterEasyAccess}
        onFilterEasyAccess={setFilterEasyAccess}
        filterOpen247={filterOpen247}
        onFilterOpen247={setFilterOpen247}
      />
      <div className={styles.mapWrap}>
        <Map
          points={filtered}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
    </div>
  );
}
