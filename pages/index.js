import Head from "next/head";
import styles from "../styles/Pages.module.scss";
import HomeVerticals from "../components/home-vertical-content";
import CurrentEvents from "../components/current-events-card";
import { connectToDatabase } from "../util/mongodb";
import { useUser } from "@auth0/nextjs-auth0";

//props.cePosts
//props.posts[0].News
function Home(props) {
  // define the user, error message, and loading status
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  // if user is logged in, return the reading list
  if (user) {
    console.log(user.sub);

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
            <CurrentEvents ceContent={props.ceContent} />
          </div>

          <div className={styles["home-content-wrap"]}>
            <HomeVerticals
              section={props.newsContent[0].Categories}
              userRL={[]}
            />
          </div>
        </main>
      </div>
    );
  }
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
