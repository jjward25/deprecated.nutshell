import Link from "next/link";
import styles from "../styles/Components.module.scss";
import Image from "next/image";
import MobileMenuExtension from "./mobile-menu-extension";
import React, { useState } from "react";

export default function HeaderMenu() {
  const [rotateChevron, setRotateChevron] = useState(false);
  function mobileMenu() {
    setRotateChevron(!rotateChevron);
  }
  return (
    <div className={styles["headerwrap"]}>
      <div
        className={styles["headerlogowrap-desktop"]}
        onClick={() => mobileMenu()}
      >
        <Link href="/" passHref>
          <p className={styles["headerlogo"]}>
            <Image src="/acorn.svg" alt="Nutshell News Logo" layout="fill" />
          </p>
        </Link>
        <Link href="/" passHref>
          <h1 className={styles["headertitle"]}>nutshell news</h1>
        </Link>
      </div>
      <div
        className={styles["headerlogowrap-mobile"]}
        onClick={() => mobileMenu()}
      >
        <p className={styles["headerlogo"]}>
          <Image src="/acorn.svg" alt="Nutshell News Logo" layout="fill" />
        </p>

        <h1 className={styles["headertitle"]}>nutshell news</h1>
      </div>
      <div className={styles[`subheader-list${rotateChevron ? "-open" : ""}`]}>
        <MobileMenuExtension />
      </div>
      <ul className={styles["headerbuttonslist"]}>
        <li className={styles["headerbuttons"]}>
          <Link href="/">News</Link>
        </li>
        <li className={styles["headerbuttons"]}>
          <Link href="/life">Life</Link>
        </li>
        <li className={styles["headerbuttons"]}>
          <Link href="/academic">Academic</Link>
        </li>
        <li className={styles["headerbuttons"]}>
          <Link href="/readinglist">Readling List</Link>
        </li>
        <li className={styles["headerbuttons"]}>
          <Link href="/about">About</Link>
        </li>
      </ul>

      <div className={styles["headersearchwrap"]}>
        <span className={styles["search-icon-wrap"]}>
          <Image src="/searchicon.svg" alt="search" layout="fill" />
        </span>
        <Link href="/search">
          <p className={styles["headersearchtext"]}> Search</p>
        </Link>
      </div>

      <div className={styles["headerlogin"]}>Login</div>
    </div>
  );
}
