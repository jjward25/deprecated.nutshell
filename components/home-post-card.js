import styles from "../styles/Components.module.scss";
import Image from "next/image";
import HomePostCardExtension from "./home-post-card-extension";
import React, { useState } from "react";
import Link from "next/link";

const ROUTE_POST_ID = "/[id]";
export default function HomePostCard(props) {
  const [rotateChevron, setRotateChevron] = useState(false);
  function shExtend() {
    setRotateChevron(!rotateChevron);
  }

  //const [userRL, setUserRL] = useState([]);
  //function postTracking() {}

  return (
    <div className={styles[`full-home-card${rotateChevron ? "-open" : ""}`]}>
      <div className={styles[`home-post-card${rotateChevron ? "-open" : ""}`]}>
        <div className={styles["post-card-bookmark"]}>
          <Image src="/logo-wide.png" alt="acron" fill />
        </div>

        <Link
          href={{
            pathname: ROUTE_POST_ID,
            query: { id: props.postName },
          }}
          as={props.postName}
          passHref
          className='w-full'
        >
          <div className={styles["post-title"]}>{props.postName}</div>
        </Link>

        <div
          className={styles[`post-card-carot${rotateChevron ? "-open" : ""}`]}
          onClick={() => shExtend()}
        >
          <Image src="/arrow-right.png" alt="carot" fill />
        </div>
      </div>

      <div className={styles[`subheader-list${rotateChevron ? "-open" : ""}`]}>
        {props.subheaderList.map((subheader) => {
          return (
            <HomePostCardExtension
              subheader={subheader.SubheaderName}
              key={`${subheader.SubheaderName}+" "+${props.postName}`}
            />
          );
        })}
      </div>
    </div>
  );
}
