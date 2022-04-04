import Head from "next/head";
import styles from "../styles/Pages.module.scss";
import HomeVerticals from "../components/home-vertical-content";
import CurrentEvents from "../components/current-events-card";
import { connectToDatabase } from "../util/mongodb";

function Home(props) {
  return (
    <div className={styles["container"]}>
      <Head>
        <title>Nutshell News</title>

        <meta
          name="description"
          content="Adult Education for the Modern World"
        />
        <link rel="icon" href="/acorn.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>

      <main className={styles["main"]}>
        <div className={styles["home-top"]}>
          <CurrentEvents ceContent={props.ceContent} />
        </div>

        <div className={styles["home-content-wrap"]}>
          <HomeVerticals section={props.newsContent[0].Categories} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const req = await db
    .collection("ContentMap")
    .find({ Section: "News" })
    .sort()
    .limit(1000)
    .toArray();
  const newsContent = await JSON.parse(JSON.stringify(req));

  const ceContent = newsContent[0].Categories[0].PostArray;

  return {
    props: {
      ceContent,
      newsContent,
    },

    revalidate: 10, // In seconds
  };
}
export default Home;
