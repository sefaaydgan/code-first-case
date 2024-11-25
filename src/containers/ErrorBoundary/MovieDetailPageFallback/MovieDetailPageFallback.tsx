import styles from "./MovieDetailPageFallback.module.scss";

const MovieDetailPageFallback = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Oops! Something went wrong when fetching movie detail.</h1>
      <button onClick={() => window.open("/", "_self")}>Go to Movie List</button>
    </div>
  );
};

export default MovieDetailPageFallback;
