import styles from "../styles/Components.module.scss";
import Link from "next/link";
const ROUTE_POST_ID = "/[id]";
import cePosts from "../cePostList.json";

export default function CurrentEvents() {
  //console.log(cePosts);
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
                  {" "}
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
