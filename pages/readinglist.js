import { getSession } from "next-auth/react";
import styles from "../styles/Pages.module.scss";
import Link from "next/link";
import Image from "next/image";

function ReadingList(props) {
  return (
    <div className={styles["container"]}>
      <div className={styles["readinglist-wrap"]}>
        <div className={styles["readinglist-left"]}>
          <div>User: {props.session.user.email}</div>
          <Link href="/profile">
            <div>Change Password</div>
          </Link>
          <div>Sign-Out</div>
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

export async function getServerSideProps(context) {
  const userReadingList = [];

  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ReadingList;
