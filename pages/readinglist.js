import { getSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";
import styles from "../styles/Pages.module.scss";

function ReadingList(props) {
  console.log(props.session);
  return (
    <div className={styles["container"]}>
      <main className={styles["main"]}>
        <div> {props.session.user.email}</div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ReadingList;
