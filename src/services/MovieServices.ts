import axios, {CancelToken} from "axios";
import queryString from "query-string";


type TMovieQuery = {
  s?: string,
  page?: number,
  y?: string,
  type?: string,
}

export const getMovies = async (queryParams: TMovieQuery, cancelToken: CancelToken) => {
  const querys: TMovieQuery = {};
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value) querys[key as keyof TMovieQuery] = value as never;
  })

  return axios.get(
    `https://www.omdbapi.com/?${queryString.stringify(querys)}&apikey=4cfbadea`, {cancelToken}
  );
};

export const getMovieById = async (id: string, cancelToken: CancelToken) => {
  return axios.get(
    `https://www.omdbapi.com/?i=${id}&apikey=4cfbadea`, {cancelToken}
  );
}
