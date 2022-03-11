import styles from "../styles/Components.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function MobileMenuExtension() {
  return (
    <div className={styles["mobile-menu-extension"]}>
      <div className={styles["extension-mobile"]}>
        <span className={styles["extension-mobile-wrap"]}>
          <Image src="/acorn.svg" alt="acorn" layout="fill" />
        </span>
        <div className={styles["extension-mobile-text"]}>
          <Link href="/">News</Link>
        </div>
      </div>

      <div className={styles["extension-mobile"]}>
        <span className={styles["extension-mobile-wrap"]}>
          <Image src="/acorn.svg" alt="acorn" layout="fill" />
        </span>
        <div className={styles["extension-mobile-text"]}>
          <Link href="/life">Life</Link>
        </div>
      </div>

      <div className={styles["extension-mobile"]}>
        <span className={styles["extension-mobile-wrap"]}>
          <Image src="/acorn.svg" alt="acorn" layout="fill" />
        </span>
        <div className={styles["extension-mobile-text"]}>
          <Link href="/academic">Academic</Link>
        </div>
      </div>

      <div className={styles["extension-mobile"]}>
        <span className={styles["extension-logo-wrap"]}>
          <Image src="/acorn.svg" alt="acorn" layout="fill" />
        </span>
        <div className={styles["extension-mobile-text"]}>
          <Link href="/readinglist">ReadingList</Link>
        </div>
      </div>

      <div className={styles["extension-mobile"]}>
        <span className={styles["extension-logo-wrap"]}>
          <Image src="/acorn.svg" alt="acorn" layout="fill" />
        </span>
        <div className={styles["extension-mobile-text"]}>
          <Link href="/about">About</Link>
        </div>
      </div>
    </div>
  );
}
