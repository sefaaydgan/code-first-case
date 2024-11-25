import styles from "./Spinner.module.scss";
import cx from "classnames"

const Spinner = ({className}: { className?: string }) => {
  return (
    <div className={cx(styles.loading, {
      [`${className}`]: className
    })}>
      <div className={styles.spinner}></div>
      <p>Loading movie details...</p>
    </div>
  );
};

export default Spinner;
