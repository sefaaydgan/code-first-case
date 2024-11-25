import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMovieDetails} from "../common/constants/typeConstants.ts";
import queryString from "query-string";

interface QueryParams {
  page: number;
  s: string;
  type: string;
  y?: string;
}

interface TableState {
  queryParams: QueryParams;
  movies: IMovieDetails[];
  totalResult: number;
}

// Başlangıç durumu
const initialState: TableState = {
  queryParams: {
    page: 1,
    s: "Pokemon",
    type: "movie",
    y: undefined,
  },
  movies: [],
  totalResult: 0,
};

export const tableSlice = createSlice({
  name: "tableSlice",
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<number>) => {
      state.queryParams.page = action.payload;
      changeLocation(queryString.stringify(state.queryParams, options))
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.queryParams.s = action.payload;
      changeLocation(queryString.stringify(state.queryParams, options))
    },
    setFilterType: (state, action: PayloadAction<string>) => {
      state.queryParams.type = action.payload;
      changeLocation(queryString.stringify(state.queryParams, options))
    },
    setYear: (state, action: PayloadAction<string | undefined>) => {
      state.queryParams.y = action.payload;
      changeLocation(queryString.stringify(state.queryParams, options))
    },
    setMovies: (state, action: PayloadAction<IMovieDetails[]>) => {
      state.movies = action.payload;
    },
    setTotalResult: (state, action: PayloadAction<number>) => {
      state.totalResult = action.payload;
    },
    setInitialQueryParams: (
      state,
      action: PayloadAction<Partial<QueryParams>>
    ) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (value !== undefined) {
          if ((key === "y" || key === "page")) {
            state.queryParams[key as keyof QueryParams] = +value as never;
          } else {
            state.queryParams[key as keyof QueryParams] = value as never;
          }
        }
      });
      changeLocation(queryString.stringify(state.queryParams, options))
    },
  },
});
const options = {
  skipEmptyString: true,
  skipNull: true
}
const changeLocation = (query: string) => {
  window.history.replaceState("", "", `?${query}`);
}
export const {
  setActivePage,
  setSearchQuery,
  setFilterType,
  setYear,
  setMovies,
  setTotalResult,
  setInitialQueryParams
} = tableSlice.actions;

export default tableSlice.reducer;
