import HomePostCard from "../components/home-post-card";
import Image from "next/image";
import styles from "../styles/Pages.module.scss";
import Accordion from "../components/postAccordion";
import { connectToDatabase } from "../util/mongodb";

export default function Article(props) {
  console.log(props.content);

  // Get the relevant post details
  var post = props.postList.filter(
    (post) => post.PostName == props.articleId
  )[0];

  // IF post is undefined, log the router data and the post object, else pull out the "Intro" content
  var intro = [];
  if (typeof post == "undefined") {
    console.log("router: " + str(router.query.id));
    console.log("postObjDict: " + str(props.postList));
    console.log("articleID: " + str(props.articleId));
  } else {
    intro = post.SubheaderArray.filter(
      (postObj) => postObj.SubheaderName == "Introduction"
    );
  }
  // Define the intro text using the "Intro" subheader content defined above
  var introText = "";
  if (typeof intro[0] == "undefined") {
    introText = "";
  } else {
    introText = intro[0].BulletArray[0].BulletText;
  }
  // Find related posts
  var category = "";
  var relatedPosts = [];
  if (typeof post == "undefined") {
    relatedPosts = props.postList.filter(
      (postItem) => postItem.Category == "Current Events"
    );
  } else {
    relatedPosts = props.postList.filter(
      (postItem) => postItem.Category == post.Category
    );
  }

  return (
    <div className={styles["container"]}>
      <main className={styles["main"]}>
        <div className={styles["home-content-wrap"]}>
          <div className={styles["related-posts"]}>
            <div className={styles["font-category-header"]}>Related Posts</div>
            <div className={styles["home-posts-wrap"]}>
              {relatedPosts
                .filter((relatedPost) => relatedPost.PostName != post.PostName)
                .map((relatedPost) => {
                  return (
                    <HomePostCard
                      key={relatedPost.PostName}
                      postName={relatedPost.PostName}
                      subheaderList={relatedPost.SubheaderArray}
                      category={category}
                    />
                  );
                })}
            </div>
          </div>

          <div className={styles["article-main-card"]}>
            <div className={styles["post-category-text"]}>{post.Category}</div>

            <div className={styles["font-title-header"]}>{post.PostName}</div>

            <div className={styles["post-intro-text"]}>{introText}</div>
            <ul className={styles["accordion"]}>
              {post.SubheaderArray.filter(
                (postObj) => postObj.SubheaderName != "Introduction"
              ).map((postObj) => {
                return (
                  <Accordion
                    heading={postObj.SubheaderName}
                    content={postObj.BulletArray.map((bullet) => {
                      return (
                        <div
                          key={bullet.BulletPriority}
                          className={styles["article-bullet-text"]}
                        >
                          <span className={styles["bullet-image-wrap"]}>
                            <Image src="/acorn.svg" alt="acorn" layout="fill" />
                          </span>
                          <div className={styles["article-bullet-text-wrap"]}>
                            <div className={styles["article-bullet-main"]}>
                              {bullet.BulletText}
                            </div>
                            <div className={styles["article-bullet-citation"]}>
                              <a
                                href={bullet.BulletLink}
                                alt="citation"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {bullet.BulletCite}
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    key={postObj.SubheaderName + postObj.SubheaderPriority}
                  />
                );
              })}
            </ul>
          </div>

          <div className={styles["post-social-icons"]}>
            <div className={styles['post-icon-bg"']}>
              <span className={styles["post-icon-wrap"]}>
                <Image src="/bookmark-false.svg" alt="bookmark" layout="fill" />
              </span>
            </div>
            <div className={styles['post-icon-bg"']}>
              <span className={styles["post-icon-wrap"]}>
                <Image src="/share.png" alt="share" layout="fill" />
              </span>
            </div>
            <div className={styles['post-icon-bg"']}>
              <span className={styles["post-icon-wrap"]}>
                <Image src="/comment.png" alt="comment" layout="fill" />
              </span>
            </div>
            <div className={styles['post-icon-bg"']}>
              <span className={styles["post-icon-wrap"]}>
                <Image src="/feedback.png" alt="feedback" layout="fill" />
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
// Set the postNames to the path parameter for dynamic routes

export const getStaticPaths = async () => {
  // Pull and jsonify a list of article-level data
  const { db } = await connectToDatabase();
  const req = await db
    .collection("PostObjList")
    .find({})
    .sort()
    .limit(1000)
    .toArray();
  const articles = await JSON.parse(JSON.stringify(req));

  const paths = articles.map((article) => ({
    params: { id: article.PostName },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  //ID is taken from the route query in home-post-card
  const articleId = ctx.params.id;

  const { db } = await connectToDatabase();
  const req = await db
    .collection("PostObjList")
    .find({})
    .sort()
    .limit(1000)
    .toArray();
  const postList = await JSON.parse(JSON.stringify(req));

  // fetch the data using the article id and return as props
  return {
    props: { articleId, postList },
    revalidate: 10,
  };
};
