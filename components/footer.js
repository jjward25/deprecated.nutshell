import Link from "next/link";
import styles from "../styles/HeaderFooter.module.scss";
import Image from "next/legacy/image";

export default function Footer() {
  return (
    <div className={styles["footerwrap"]}>
      <div className={styles["footer-left"]}>
        <div className={styles["footerlogowrap"]}>
          <Link href="/" passHref>
            <span className={styles["footer-logo"]}>
              <Image
                src="/acorn-grey.svg"
                alt="Nutshell News Logo"
                className="headerlogo"
                height="30"
                width="30"
              />
            </span>
          </Link>

          <Link href="/" passHref>
            <h1 className={styles["footer-title"]}>nutshell news</h1>
          </Link>
        </div>

        <p className={styles["copyright"]}>Copyright 2022</p>
      </div>

      <ul className={styles["footerbuttonslist"]}>
        <li className={styles["footerbuttons"]}>
          <a
            href="https://twitter.com/NutshellNewsCo"
            target="_blank"
            rel="noreferrer"
            alt="Twitter"
          >
            Twitter
          </a>
        </li>

        <li className={styles["footerbuttons"]}>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}
