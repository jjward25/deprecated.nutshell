import Footer from "./footer";
import HeaderMenu from "./header";
import styles from '../styles/Components.module.scss';

const Layout = ({children}) => {
    return (
        <div className={styles['layout-container']}>
            <HeaderMenu/>
            { children }
            <Footer/>
        </div>
    );
}

export default Layout;