import HomePostCard from "./home-post-card";
import styles from "../styles/Components.module.scss";
import React from "react";

export default function HomeVerticals(props) {
  return (
    <div className={styles["category-home-vertical-wrap"]}>
      {props.section
        .filter((category) => category.CategoryName != "Current Events")
        .map((category) => {
          return (
            <div
              className={styles["category-home-vertical"]}
              key={category.CategoryName}
            >
              <div className={styles["font-category-header"]}>
                {category.CategoryName}
              </div>
              <div className={styles["home-posts-wrap"]}>
                {category.PostArray.map((post) => {
                  return (
                    <HomePostCard
                      key={post.PostName}
                      postName={post.PostName}
                      subheaderList={post.SubheaderArray}
                      category={category.CategoryName}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
