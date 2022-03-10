import React, { useState } from "react";
import styles from "../styles/Pages.module.scss";
import Image from "next/image";

const Accordion = ({ heading, content }) => {
  const [isActive, setIsActive] = useState(false);

  const [rotateChevron, setRotateChevron] = useState(false);
  function shExtend() {
    setRotateChevron(!rotateChevron);
  }
  return (
    <li className={styles["subheader-accordion"]}>
      <div
        className={styles[`accordion-header${rotateChevron ? "-open" : ""}`]}
        onClick={() => {
          setIsActive(!isActive);
          shExtend();
        }}
      >
        <h3 className={styles["subheader-text"]}>{heading}</h3>
        <div
          className={
            styles[`subheader-image-wrap${rotateChevron ? "-open" : ""}`]
          }
        >
          <Image src="/purple-arrow-right.png" alt="carot" layout="fill" />
        </div>
      </div>
      {isActive && <div className={styles["accordion-content"]}>{content}</div>}
    </li>
  );
};

export default Accordion;
