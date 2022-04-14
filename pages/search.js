import HomePostCard from "../components/home-post-card";
import styles from "../styles/Pages.module.scss";
import { connectToDatabase } from "../util/mongodb";

export default function Search(props) {
  var searchTerm = "";
  if (typeof window == "undefined") {
    searchTerm = "";
  } else {
    searchTerm = JSON.parse(localStorage.getItem("searchTerm"));
    console.log(searchTerm);
  }

  var searchList = [];
  searchList = props.postList.filter((post) => {
    return (
      post.PostName.toLowerCase().indexOf(searchTerm) >= 0 ||
      post.Category.toLowerCase().indexOf(searchTerm) >= 0 ||
      post.Section.toLowerCase().indexOf(searchTerm) >= 0
    );
  });

  console.log(searchList);
  return (
    <div className={styles["container"]}>
      <main className={styles["main"]}>
        <div className={styles["search-content-wrap"]}>
          {searchList.map((post) => {
            return (
              <HomePostCard
                key={post.PostName}
                postName={post.PostName}
                subheaderList={post.SubheaderArray}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const req = await db
    .collection("PostObjList")
    .find()
    .sort()
    .limit(1000)
    .toArray();
  const postList = await JSON.parse(JSON.stringify(req));

  return {
    props: {
      postList,
    },
    revalidate: 10, // In seconds
  };
}
