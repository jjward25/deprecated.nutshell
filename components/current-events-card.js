import styles from "../styles/CurrentEventsCard.module.scss";
import Link from "next/link";
import React, { useRef } from "react";
const ROUTE_POST_ID = "/[id]";

export default function CurrentEvents(props) {
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <div className={styles["current-events"]}>
      <div className={styles["font-category-header"]}>Current Events </div>
      <div className={styles["ce-horizontal-wrap"]}>
        <div className={styles["ce-card-wrap"]} ref={ref}>
          {props.ceContent.map((post) => {
            return (
              <div className={styles["ce-map-l1"]}>
                {post.SubheaderArray.map((subheader) => {
                  return (
                    <div className={styles["ce-map"]}>
                      {subheader.BulletArray.map((bullet) => {
                        return (
                          <div
                            className={styles["current-events-card"]}
                            key={
                              post.postDate +
                              "." +
                              post.PostPriority +
                              "." +
                              subheader.SubheaderPriority +
                              "." +
                              bullet.BulletPriority
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
                                    {subheader.SubheaderName}
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

                            <div className={styles["ce-card-main"]}>
                              {bullet.BulletText}
                            </div>

                            <div className={styles["ce-card-citation"]}>
                              <a
                                href={bullet.BulletLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {bullet.BulletCite}
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <button
          className={styles["scroll-button"]}
          onClick={() => scroll(850)}
        >{`>`}</button>
      </div>
    </div>
  );
}
