import Link from "next/link";
import styles from "../styles/HeaderFooter.module.scss";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function HeaderMenu() {
  const router = useRouter();
  const [rotateChevron, setRotateChevron] = useState(false);
  function mobileMenu() {
    setRotateChevron(!rotateChevron);
  }

  const [searchTerm, setSearchTerm] = useState("Search"); //set searchterm
  const handleChange = (searchValue) => {
    setSearchTerm(searchValue.toLowerCase());
    if (typeof window !== "undefined") {
      localStorage.removeItem("searchTerm");
      localStorage.setItem(
        "searchTerm",
        JSON.stringify(searchValue.toLowerCase())
      );
    } // this loop updates the searchterm when the input is updated, and sets it to lowercase and saves to localStorage
    //console.log(searchValue.toLowerCase());
    //console.log(localStorage.getItem("searchTerm"));
  };
  

  return (
    <div className={styles["headerwrap"]}>
      <div
        className={styles["headerlogowrap-desktop"]}
        onClick={() => mobileMenu()}
      >
        <Link href="/" passHref className="h-full m-auto pb-1">
          <p className={styles["headerlogo"]}>
            <Image src="/acorn.svg" alt="Nutshell News Logo" fill/>
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
          <Image src="/acorn.svg" alt="Nutshell News Logo" fill />
        </p>

        <h1 className={styles["headertitle"]}>nutshell news</h1>
      </div>
      <div className={styles[`subheader-list${rotateChevron ? "-open" : ""}`]}>
        <div className={styles["mobile-menu-extension"]}>
          <div
            className={styles["extension-mobile"]}
            onClick={() => mobileMenu()}
          >
            <span className={styles["extension-mobile-wrap"]}>
              <Image src="/acorn.svg" alt="acorn" fill />
            </span>
            <div className={styles["extension-mobile-text"]}>
              <Link href="/">News</Link>
            </div>
          </div>

          <div
            className={styles["extension-mobile"]}
            onClick={() => mobileMenu()}
          >
            <span className={styles["extension-mobile-wrap"]}>
              <Image src="/acorn.svg" alt="acorn" fill />
            </span>
            <div className={styles["extension-mobile-text"]}>
              <Link href="/life">Life</Link>
            </div>
          </div>

          <div
            className={styles["extension-mobile"]}
            onClick={() => mobileMenu()}
          >
            <span className={styles["extension-mobile-wrap"]}>
              <Image src="/acorn.svg" alt="acorn" fill />
            </span>
            <div className={styles["extension-mobile-text"]}>
              <Link href="/academic">Academic</Link>
            </div>
          </div>

          <div
            className={styles["extension-mobile"]}
            onClick={() => mobileMenu()}
          >
            <span className={styles["extension-mobile-wrap"]}>
              <Image src="/acorn.svg" alt="acorn" fill />
            </span>
            <div className={styles["extension-mobile-text"]}>
              <Link href="/login">Reading List</Link>
            </div>
          </div>

          <div
            className={styles["extension-mobile"]}
            onClick={() => mobileMenu()}
          >
            <span className={styles["extension-mobile-wrap"]}>
              <Image src="/acorn.svg" alt="acorn" fill />
            </span>
            <div className={styles["extension-mobile-text"]}>
              <Link href="/about">About</Link>
            </div>
          </div>
        </div>
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
          <Link href="/login">Reading List</Link>
        </li>
        <li className={styles["headerbuttons"]}>
          <Link href="/about">About</Link>
        </li>
      </ul>

      <div className={styles["headersearchwrap"]}>
        <span className={styles["search-icon-wrap"]}>
          <Image src="/searchicon.svg" alt="search" fill />
        </span>
        <form className={styles["headersearchtext-wrap"]} action="/search">
          <input
            className={styles["headersearchtext"]}
            placeholder="Search"
            onChange={(e) => handleChange(e.target.value)}
          />
        </form>
      </div>

      <div className={styles["headerlogin"]}>Login</div>
    </div>
  );
}
