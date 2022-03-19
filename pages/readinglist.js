import styles from "../styles/Pages.module.scss";
import Image from "next/image";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function ReadingList({ user, error, isLoading }) {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className={styles["container"]}>
      <div className={styles["readinglist-wrap"]}>
        <div className={styles["readinglist-left"]}>
          <div>User: {user.email}</div>

          <a
            href={`https://dev-wo4ey-tk.us.auth0.com/v2/logout?client_id=WS7xSuJouhSrpqWwQH8Wi4tOwqjEdFdU&returnTo=https://www.nutshell.news/`}
          >
            Logout
          </a>
          <div> User Data: {JSON.stringify(user)}</div>
        </div>
        <div className={styles["readinglist-main-card"]}>
          <div className={styles["font-title-header"]}>Reading List</div>

          <div className={styles["readinglist-post-card"]}>
            <div className={styles["rl-card-titlebar"]}>
              <div className={styles["rl-card-posttitle"]}>Post Title</div>
              <div className={styles["rl-card-buttons"]}>
                <div className={styles["post-card-bookmark"]}>
                  <Image
                    src="/bookmark-unselected.svg"
                    alt="bookmark"
                    layout="fill"
                  />
                </div>
                <span className={styles["rl-icon"]}>
                  <Image src="/share.png" alt="share" layout="fill" />
                </span>
                <span className={styles["rl-icon"]}>
                  <Image src="/remove-icon.svg" alt="share" layout="fill" />
                </span>
              </div>
            </div>

            <div className={styles["article-bullet-text"]}>
              <div className={styles["bullet-image-wrap"]}>
                <Image src="/acorn.svg" alt="acorn" layout="fill" />
              </div>
              <div className={styles["bullet-text-wrap"]}>
                <div className={styles["article-bullet-main"]}>Bullet Text</div>
                <div className={styles["article-bullet-citation"]}>
                  Bullet Cite
                </div>
              </div>
            </div>
            <div className={styles["article-bullet-text"]}>
              <div className={styles["bullet-image-wrap"]}>
                <Image src="/acorn.svg" alt="acorn" layout="fill" />
              </div>
              <div className={styles["bullet-text-wrap"]}>
                <div className={styles["article-bullet-main"]}>Bullet Text</div>
                <div className={styles["article-bullet-citation"]}>
                  Bullet Cite
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withPageAuthRequired(ReadingList);
