import styles from "../styles/Pages.module.scss";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";

export default function ReadingList() {
  // define the user, error message, and loading status
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  // if user is logged in, return the reading list
  if (user) {
    return (
      <div className={styles["container"]}>
        <div className={styles["readinglist-wrap"]}>
          <div className={styles["readinglist-left"]}>
            <div>User: {user.email}</div>
            <div>User: {}</div>
            <a
              href={`https://www.nutshell.news/api/auth/logout?client_id=WS7xSuJouhSrpqWwQH8Wi4tOwqjEdFdU&returnTo=https://www.nutshell.news/`}
            >
              Logout
            </a>
          </div>
          <div className={styles["readinglist-main-card"]}>
            <div className={styles["font-title-header"]}>Reading List</div>

            <div className={styles["readinglist-post-card"]}>
              <div className={styles["rl-card-titlebar"]}>
                <div className={styles["rl-card-posttitle"]}>Post Title</div>
                <div className={styles["rl-card-buttons"]}>
                  <div className={styles["post-card-bookmark"]}>
                    <Image
                      src="/bookmark-false.svg"
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
                  <div className={styles["article-bullet-main"]}>
                    Bullet Text
                  </div>
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
                  <div className={styles["article-bullet-main"]}>
                    Bullet Text
                  </div>
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
  // IF there is no active user, redirect to the login screen
  return <a href="https://nutshell.news/api/auth/login">Login</a>;
}
