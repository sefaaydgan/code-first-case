import Filters from "../../components/Filters/Filters.tsx";
import Table from "../../components/Table/Table.tsx";
import Pagination from "../../components/Pagination/Pagination.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AxiosResponse, CancelToken} from "axios";
import {setActivePage, setMovies, setTotalResult} from "../../store/slice.ts";
import useFetch from "../../common/hooks/useFetch.ts";
import {getMovies} from "../../services/MovieServices.ts";
import styles from "./MainPage.module.scss";
import {RootState} from "../../store/store.ts";
import useSyncStateAndUrl from "../../common/hooks/useSyncStateAndUrl.ts";

const MainPage = () => {
  useSyncStateAndUrl();
  const dispatch = useDispatch()
  const {queryParams, totalResult} = useSelector((state: RootState) => state.data);
  const updateMovies = (res: AxiosResponse, type: string) => {
    if (type === "err") {
      return;
    }
    dispatch(setTotalResult(+res.data.totalResults || 0));
    dispatch(setMovies(res.data.Search || []));
  }
  const [loading] = useFetch({
    request: (cancelToken: CancelToken) => getMovies(queryParams, cancelToken),
    deps: [queryParams],
    condition: !!queryParams,
    updater: updateMovies,
  });

  const onPageChange = (page: number) => {
    dispatch(setActivePage(page))
  }
  return (
    <div className={styles.wrapper}>
      <h1>Movie Search App</h1>
      <Filters/>
      <Table loading={loading}/>
      <Pagination
        totalLength={totalResult}
        onPageChange={onPageChange}
        activePage={queryParams.page}
      />
    </div>
  );
};

export default MainPage;
