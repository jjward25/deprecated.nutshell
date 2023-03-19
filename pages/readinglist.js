import styles from "../styles/Pages.module.scss";
import Image from "next/image";
import { useSession, signOut, signIn, signUp } from 'next-auth/react';
import Link from 'next/link';

export default function ReadingList() {
  // define the user, error message, and loading status
  const { data: session } = useSession()

  return (
    <div className={styles["container"]}>
      <main className={styles["main"]}>
        <div className={styles["readinglist-wrap-main"]}>
          <div className={styles["readinglist-content-main"]}>
            <div className={styles["readinglist-left"]}>
              <div>User: {session?.user?.email || "Unknown"}</div>
              <button onClick={() => signOut()}>Sign Out</button>
            </div>
            <div className={styles["readinglist-main-card"]}>
              <div className={styles["font-title-header"]}>Reading List</div>

              <div className={styles["readinglist-post-card"]}>
                <div className={styles["rl-card-titlebar"]}>
                  <div className={styles["rl-card-posttitle"]}>
                    Post Title
                  </div>
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
                      <Image
                        src="/remove-icon.svg"
                        alt="share"
                        layout="fill"
                      />
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
      </main>
    </div>
  )
  }