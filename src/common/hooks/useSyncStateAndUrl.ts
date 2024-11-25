import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setInitialQueryParams} from "../../store/slice.ts";
import queryString from "query-string";
import {useLocation} from "react-router";

export const useSyncStateAndUrl = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    dispatch(setInitialQueryParams(queryParams));
  }, [location.search, dispatch]);
};
export default useSyncStateAndUrl
