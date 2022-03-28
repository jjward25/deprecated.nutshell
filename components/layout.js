import Footer from "./footer";
import HeaderMenu from "./header";
import styles from "../styles/HeaderFooter.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles["layout-container"]}>
      <HeaderMenu />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
