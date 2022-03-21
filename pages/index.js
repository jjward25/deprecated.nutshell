import Head from "next/head";
import styles from "../styles/Pages.module.scss";
import HomeVerticals from "../components/home-vertical-content";
import CurrentEvents from "../components/current-events-card";

//props.cePosts
//props.posts[0].News
function Home(props) {
  return (
    <div className={styles["container"]}>
      <Head>
        <title>Nutshell News</title>

        <meta
          name="description"
          content="Adult Education for the Modern World"
        />
        <link rel="icon" href="/acorn.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>

      <main className={styles["main"]}>
        <div className={styles["home-top"]}>
          <CurrentEvents ceBullets={props.cePosts} />
        </div>

        <div className={styles["home-content-wrap"]}>
          <HomeVerticals section={props.posts[0].News} />
        </div>
      </main>
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch("https://www.nutshell.news/api/contentObj");
  const posts = await res.json();

  const res2 = await fetch("https://www.nutshell.news/api/cePosts");
  const cePosts = await res2.json();

  return {
    props: {
      posts,
      cePosts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
export default Home;
