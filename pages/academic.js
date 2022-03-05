import HomeVerticals from "../front-components/home-vertical-content";
import styles from "../styles/Pages.module.scss";
import Content from "../content.json";
export default function Academic() {
  return (
    <div className={styles["container"]}>
      <main className={styles["main"]}>
        <div className={styles["home-content-wrap"]}>
          <HomeVerticals section={Content.Academic} />
        </div>
      </main>
    </div>
  );
}
