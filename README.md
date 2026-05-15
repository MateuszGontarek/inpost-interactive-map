# 📦 Mapa Paczkomatów InPost

Interaktywna mapa paczkomatów InPost w Polsce zbudowana w Next.js 14 (App Router).

## Stack

- **Next.js 14** – App Router, Server Components, Route Handlers
- **React Leaflet** – interaktywna mapa
- **TypeScript** – typowanie

## Architektura

```
app/
  page.tsx          → Server Component: pobiera dane przy SSR
  layout.tsx        → Root layout z fontami
  globals.css       → Leaflet CSS + reset
  api/points/
    route.ts        → API proxy (unika CORS w produkcji)

components/
  MapView.tsx       → Client Component: stan, filtry, koordynacja
  Map.tsx           → Leaflet mapa (dynamic import, no SSR)
  Sidebar.tsx       → Lista punktów + wyszukiwarka + filtry

lib/
  api.ts            → Fetcher dla InPost API

types/
  inpost.ts         → Typy TypeScript
```

## Uruchomienie

```bash
npm install
npm run dev
```

Otwórz http://localhost:3000

