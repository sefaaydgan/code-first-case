import styles from "./MainPageFallback.module.scss";

const MainPageFallback = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Oops! Something went wrong when fetching movie data.</h1>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
};

export default MainPageFallback;
