import HomeVerticals from "../components/home-vertical-content";
import styles from "../styles/Pages.module.scss";

export default function Life(props) {
  return (
    <div className={styles["container"]}>
      <main className={styles["main"]}>
        <div className={styles["home-content-wrap"]}>
          <HomeVerticals section={props.posts[0].Life} />
        </div>
      </main>
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/contentObj");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
