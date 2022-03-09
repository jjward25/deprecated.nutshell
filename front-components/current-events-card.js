import styles from "../styles/Components.module.scss";
import Link from "next/link";
const ROUTE_POST_ID = "/[id]";
import cePosts from "../cePostList.json";

export default function CurrentEvents(props) {
  console.log(cePosts);
  console.log(props.posts);
  return (
    <div className={styles["current-events"]}>
      <div className={styles["font-category-header"]}>Current Events </div>

      <div className={styles["ce-card-wrap"]}>
        {cePosts.map((post) => {
          return (
            <div
              className={styles["current-events-card"]}
              key={
                post.Category +
                "." +
                post.PostPriority +
                "." +
                post.SubheaderPriority +
                "." +
                post.BulletPriority
              }
            >
              <div className={styles["ce-card-header"]}>
                <div className={styles["ce-card-subheader"]}>
                  <div className={styles["subheader-text"]}>
                    <Link
                      href={{
                        pathname: ROUTE_POST_ID,
                        query: { id: post.PostName },
                      }}
                      as={post.PostName}
                      passHref
                    >
                      {post.SubheaderName}
                    </Link>
                  </div>
                </div>
                <div className={styles["ce-card-postdate"]}>
                  <Link
                    href={{
                      pathname: ROUTE_POST_ID,
                      query: { id: post.PostName },
                    }}
                    as={post.PostName}
                    passHref
                  >
                    {post.PostDate}
                  </Link>
                </div>
              </div>

              <div className={styles["ce-card-main"]}>{post.BulletText}</div>

              <div className={styles["ce-card-citation"]}>
                <a href={post.BulletLink} target="_blank" rel="noreferrer">
                  {post.BulletCite}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/cePosts");
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
