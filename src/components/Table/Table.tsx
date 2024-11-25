import styles from "./Table.module.scss";
import {useSelector} from "react-redux";
import {NavigateFunction, useNavigate} from "react-router";
import WarningIcon from "@Icons/icon-warning.svg?react";
import {RootState} from "../../store/store.ts";
import {IMovieDetails} from "../../common/constants/typeConstants.ts";
import Spinner from "../Spinner/Spinner.tsx";

const Table = ({loading}: { loading: boolean }) => {
  const movies = useSelector((state: RootState) => state.data.movies)
  const navigate: NavigateFunction = useNavigate();
  const renderTableRows = () => {
    if (movies.length === 0) return <tr>
      <td className={styles.noResult} colSpan={3}>
        <WarningIcon/>
        <p>In order to see movie list, please search</p>
      </td>
    </tr>;
    if (loading) return <tr>
      <td className={styles.noResult} colSpan={3}><Spinner className={styles.spinner}/></td>
    </tr>

    return movies?.map((movie: IMovieDetails) => (
      <tr key={movie.imdbID} onClick={() => navigate(`/movie/${movie.imdbID}`)}>
        <td>{movie.Title}</td>
        <td>{movie.Year}</td>
        <td>{movie.imdbID}</td>
      </tr>
    ))
  }
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Release Date</th>
          <th>IMDb ID</th>
        </tr>
        </thead>
        <tbody>
        {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
