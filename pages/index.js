import Head from "next/head";
import styles from "../styles/Pages.module.scss";
import HomeVerticals from "../components/home-vertical-content";
import CurrentEvents from "../components/current-events-card";
import Content from "../content.json";
import CEPOSTS from "../cePostList.json";

//props.cePosts
//props.posts[0].News
export default function Home(props) {
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
        <link
          href={`https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Contrail+One&family=Fredericka+the+Great&family=Julius+Sans+One&family=Montserrat:wght@500;600;700&family=Raleway+Dots&family=Raleway:wght@500&family=Sanchez&family=Stick+No+Bills:wght@500&display=swap`}
          rel="stylesheet"
        />
      </Head>

      <main className={styles["main"]}>
        <div className={styles["home-top"]}>
          <CurrentEvents ceBullets={CEPOSTS} />
        </div>

        <div className={styles["home-content-wrap"]}>
          <HomeVerticals section={Content[0].News} />
        </div>
      </main>
    </div>
  );
}
/*export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/contentObj");
  const posts = await res.json();

  const res2 = await fetch("http://localhost:3000/api/cePosts");
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
}*/
