# 📦 Mapa Paczkomatów InPost

Interaktywna mapa paczkomatów InPost w Polsce zbudowana w Next.js 14 (App Router).

## Stack

- **Next.js 14** – App Router, Server Components, Route Handlers
- **React Leaflet** – interaktywna mapa
- **TypeScript** – typowanie
- **CSS Modules** – stylowanie bez zewnętrznych bibliotek

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

## Funkcje MVP

- ✅ Pobieranie danych z InPost API przy ładowaniu strony (SSR)
- ✅ Interaktywna mapa (Leaflet + CartoDB tiles)
- ✅ Sidebar z listą paczkomatów
- ✅ Wyszukiwanie po mieście, ulicy, nazwie
- ✅ Filtr 24/7 i łatwy dostęp
- ✅ Popup z detalami: adres, dostępność skrytek A/B/C
- ✅ Kliknięcie na liście → fly to na mapie
- ✅ Cache 5 minut (next revalidate)
- ✅ API proxy route (eliminuje CORS)

## Dalszy rozwój

- [ ] Geolokalizacja użytkownika
- [ ] Filtrowanie po promieniu od lokalizacji
- [ ] Tryb ciemny
- [ ] Paginacja / infinite scroll na liście
- [ ] PWA / offline support
