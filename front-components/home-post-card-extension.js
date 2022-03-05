import styles from "../styles/Components.module.scss";
import Image from "next/image";

export default function HomePostCardExtension(props) {
  return (
    <div className={styles["home-post-card-extension"]}>
      <div className={styles["extension-subheader"]}>
        <span className={styles["extension-logo-wrap"]}>
          <Image src="/acorn.svg" alt="acorn" layout="fill" />
        </span>
        <div className={styles["extension-subheader-text"]}>
          {props.subheader}
        </div>
      </div>
    </div>
  );
}
