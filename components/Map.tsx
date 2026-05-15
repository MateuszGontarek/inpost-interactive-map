"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import type { Point } from "@/types/inpost";
import styles from "./Map.module.css";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const lockerIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:28px;height:28px;border-radius:50%;
    background:#ffcb00;border:2.5px solid #1a1a1a;
    display:flex;align-items:center;justify-content:center;
    font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,0.25);
  ">📦</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -16],
});

const selectedIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:36px;height:36px;border-radius:50%;
    background:#ffcb00;border:3px solid #1a1a1a;
    display:flex;align-items:center;justify-content:center;
    font-size:16px;box-shadow:0 4px 12px rgba(0,0,0,0.35);
    transform:scale(1.1);
  ">📦</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20],
});

function FlyToSelected({ point }: { point: Point | null }) {
  const map = useMap();
  const prevRef = useRef<string | null>(null);

  useEffect(() => {
    if (point && point.name !== prevRef.current) {
      prevRef.current = point.name;
      map.flyTo([point.location.latitude, point.location.longitude], 16, {
        duration: 0.8,
      });
    }
  }, [point, map]);

  return null;
}

interface MapProps {
  points: Point[];
  selected: Point | null;
  onSelect: (p: Point) => void;
}

export default function Map({ points, selected, onSelect }: MapProps) {
  return (
    <MapContainer
      center={[52.069, 19.48]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <ZoomControl position="bottomright" />
      <FlyToSelected point={selected} />

      {points.map((point) => (
        <Marker
          key={point.name}
          position={[point.location.latitude, point.location.longitude]}
          icon={selected?.name === point.name ? selectedIcon : lockerIcon}
          eventHandlers={{ click: () => onSelect(point) }}
        >
          <Popup minWidth={240} maxWidth={300}>
            <div className={styles.popup}>
              <div className={styles.popupHeader}>
                <span className={styles.popupName}>{point.name}</span>
                {point.opening_hours === "24/7" && (
                  <span className={styles.pill247}>24/7</span>
                )}
              </div>
              <p className={styles.popupAddr}>
                {point.address.line1}
                <br />
                {point.address.line2}
              </p>
              {point.location_description && (
                <p className={styles.popupDesc}>{point.location_description}</p>
              )}
              <div className={styles.popupMeta}>
                {point.easy_access_zone && (
                  <span className={styles.pillEasy}>♿ Łatwy dostęp</span>
                )}
                <span className={styles.pillStatus}>
                  {point.status === "Operating" ? "✓ Działa" : point.status}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
