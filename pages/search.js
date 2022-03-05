import HomePostCard from "../front-components/home-post-card";
import HomePostCardExtension from "../front-components/home-post-card-extension";
import styles from "../styles/Pages.module.scss";

export default function Search() {
  return (
    <div className={styles["container"]}>
      <main className={styles["main"]}>
        <div className={styles["search-content-wrap"]}>
          <div className={styles["search-result-card"]}></div>
        </div>
      </main>
    </div>
  );
}
