import styles from '../styles/Components.module.scss';

export default function HomePostCard() {
 
    var postSelected = false;

    const bookmarkClick = e => {
        
        var postSelected = !postSelected;   

        if (postSelected === true) {
            var markImg = "/bookmark-unselected.svg"
        }
        else if (postSelected === false) {
            var markImg = "/bookmark-selected.svg"
        }

    }
 
    return (
 
        <div className={styles['post-icon-bg']} >
            <span className={styles['bookmark-img-wrap']} onClick={bookmarkClick()}>
             <Image src={markImg} alt="bookmark" layout='fill'/>
            </span>
        
        </div>

    )
}