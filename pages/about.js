import styles from "../styles/Pages.module.scss";

export default function About() {
  return (
    <div className={styles["container"]}>
      <main className={styles["main"]}>
        <div className={styles["about-content-wrap"]}>
          <div className={styles["font-title-header"]}>Nutshell News</div>
          <div className={styles["font-category-header"]}>Adult Education</div>
          <p className={styles["about-text"]}>
            {`To us, The News should be relevant, it should be useful, and it should be easy to follow.  So we tailor our News coverage a little differently,
              and include Life and Academic sections for you to learn about things that are more immediately useful for you than traditional news.`}
            <br />
            <br />
            {`We want to make it as easy as possible to keep up with the world. That's why we publish only one article for each topic, in a simple bulleted 
              format.`}
            <br />
            <br />
            {`Google and Apple aggregate headlines, we aggregate information.`}
          </p>
          <div className={styles["font-category-header"]}>
            Your Reading List
          </div>
          <p className={styles["about-text"]}>
            {`To make things even easier, you can track articles so that new bullets will show up in your Reading List.  This way you read one article, once, 
              then get new updates on issues you care about directly in your Reading List, without having to skim the whole article again.`}
            <br />
            <br />
            {`This is smarter coverage for smarter people to promote better living.  This is Adult Education - detailed, useful information with no agenda or slant.`}
            <br />
            <br />
            {`Casually Adept is news for people who hate the news.`}
          </p>
        </div>
      </main>
    </div>
  );
}
