import HomeVerticals from "../components/home-vertical-content";
import styles from "../styles/Pages.module.scss";
import { connectToDatabase } from "../util/mongodb";

export default function Academic(props) {
  return (
    <div className={styles["container"]}>
      <main className={styles["main"]}>
        <div className={styles["home-content-wrap"]}>
          <HomeVerticals section={props.academicContent[0].Categories} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const req = await db
    .collection("ContentMap")
    .find({ Section: "Academic" })
    .sort()
    .limit(1000)
    .toArray();
  const academicContent = await JSON.parse(JSON.stringify(req));

  return {
    props: {
      academicContent,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
