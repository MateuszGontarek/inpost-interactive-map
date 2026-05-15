import { fetchAllPoints } from "@/lib/api";
import { MapView } from "@/components/MapView";
import styles from "./page.module.css";

export default async function Home() {
  const data = await fetchAllPoints();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>📦</span>
          <span className={styles.logoText}>InPost</span>
          <span className={styles.logoSub}>Mapa Paczkomatów</span>
        </div>
        <div className={styles.badge}>
          <span className={styles.dot} />
          {data.count.toLocaleString("pl-PL")} punktów w Polsce
        </div>
      </header>

      <MapView initialPoints={data.items} totalCount={data.count} />
    </main>
  );
}
