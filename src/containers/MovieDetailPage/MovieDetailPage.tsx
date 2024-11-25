import {NavigateFunction, Params, useNavigate, useParams} from "react-router";
import useFetch from "../../common/hooks/useFetch.ts";
import {AxiosResponse, CancelToken} from "axios";
import {getMovieById} from "../../services/MovieServices.ts";
import {useState} from "react";
import styles from "./MovieDetailPage.module.scss";
import {IMovieDetails} from "../../common/constants/typeConstants.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";

const MovieDetailPage = () => {
  const params: Readonly<Params> = useParams();
  const navigate: NavigateFunction = useNavigate();
  const [movie, setMovie] = useState<IMovieDetails>()
  const updater = (res: AxiosResponse, type: string) => {
    if (type === "err") {
      return;
    }
    setMovie(res.data || [])
  }

  const [loading] = useFetch({
    request: (cancelToken: CancelToken) => getMovieById(params.id || "", cancelToken),
    deps: [],
    condition: true,
    updater: updater,
  });

  const {
    Title,
    Year,
    Poster,
    Plot,
    Genre,
    Director,
    Actors,
    Language,
    Country,
    Runtime,
    Ratings,
    Awards,
    BoxOffice,
    imdbRating,
    imdbVotes,
  } = movie || {}

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <Spinner/>
      </div>
    );
  }
  if (!movie) {
    return <p>Failed to load movie details.</p>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.movieDetails}>
        <button className={styles.backButton} onClick={() => {
          navigate("/")
        }}>
          ← Back
        </button>
        <div className={styles.movieHeader}>
          <div className={styles.moviePoster}>
            <img src={Poster} alt={`${Title} Poster`}/>
          </div>
          <div className={styles.movieMainInfo}>
            <h1>{Title}</h1>
            <p className={styles.movieGenre}>{Genre}</p>
            <p className={styles.movieYearRuntime}>
              {Year} • {Runtime}
            </p>
            <div className={styles.imdbRating}>
              <strong>IMDb:</strong>
              <span className={styles.ratingNumber}>{imdbRating}/10</span>
            </div>
            <div className={styles.imdbVotes}>
              <strong>Votes:</strong> {imdbVotes}
            </div>
          </div>
        </div>
        <div className={styles.movieRatings}>
          {Ratings?.map((rating, index) => (
            <div key={index} className={styles.ratingCard}>
              <span className={styles.ratingSource}>{rating.Source}</span>
              <span className={styles.ratingValue}>{rating.Value}</span>
            </div>
          ))}
        </div>
        <div className={styles.movieInfoGrid}>
          <div>
            <strong>Director:</strong> {Director}
          </div>
          <div>
            <strong>Actors:</strong> {Actors}
          </div>
          <div>
            <strong>Language:</strong> {Language}
          </div>
          <div>
            <strong>Country:</strong> {Country}
          </div>
          <div>
            <strong>Box Office:</strong> {BoxOffice}
          </div>
          <div>
            <strong>Awards:</strong> {Awards}
          </div>
        </div>
        <div className={styles.moviePlot}>
          <h2>Plot</h2>
          <p>{Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
