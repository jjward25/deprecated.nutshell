import HomePostCard from "../components/home-post-card";
import styles from "../styles/Pages.module.scss";

export default function Search(props) {
  return (
    <div className={styles["container"]}>
      <main className={styles["main"]}>
        <div className={styles["search-content-wrap"]}>
          {category.PostArray.map((post) => {
            return (
              <HomePostCard
                key={post.PostName}
                postName={post.PostName}
                subheaderList={post.SubheaderArray}
                category={category.CategoryName}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
