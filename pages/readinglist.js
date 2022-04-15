import styles from "../styles/Pages.module.scss";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import { connectToDatabase } from "../util/mongodb";

export default function ReadingList(props) {
  // define the user, error message, and loading status
  const { user, error, isLoading } = useUser();
  console.log(props.userList[0].email);
  console.log(user);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  // if user is logged in, return the reading list
  if (user) {
    var userData = props.userList.filter(
      (apiUser) => (apiUser.email = user.email)
    );
    return (
      <div className={styles["container"]}>
        <main className={styles["main"]}>
          <div className={styles["readinglist-wrap-main"]}>
            <div className={styles["readinglist-content-main"]}>
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
    );
  }
  // IF there is no active user, redirect to the login screen
  return (
    <div className={styles["container"]}>
      <main className={styles["main"]}>
        <div className={styles["readinglist-wrap"]}>
          <div className={styles["readinglist-content"]}>
            <div className={styles["font-title-header"]}>Your Reading List</div>
            <p className={styles["about-text"]}>
              Make an account today to receive post updates in a personal
              Reading List. This way you read an article once, then just check
              your Reading List for updates on the topics you care about.
              <br />
              <br />
              We're not trying to monopolize your attention, just make life a
              little easier.
            </p>
            <button className={styles["signup-button"]}>
              <a href="https://nutshell.news/api/auth/login">
                Sign-Up or Login
              </a>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const req = await db
    .collection("users")
    .find({ email: "joseph.ward@outlook.com" })
    .sort()
    .limit(1000)
    .toArray();
  const userData = await JSON.parse(JSON.stringify(req));
  /* find all the data in our database */

  const req2 = await db
    .collection("PostObjList")
    .find({})
    .sort()
    .limit(1000)
    .toArray();
  const postData = await JSON.parse(JSON.stringify(req2));

  return { props: { userList: userData, postList: postData } };
}
