import styles from "./Header.module.scss";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

const Header = ({ headerData, goBack }) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.content}>
          <h1>{headerData.detail}</h1>
        </div>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap"
            rel="stylesheet"
          />
          <title>{headerData.title}</title>
        </Head>
        {headerData.allowoBack && (
          <button onClick={goBack}>
            <FontAwesomeIcon width={20} icon={faLongArrowAltLeft} />
            <span>Back</span>
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
