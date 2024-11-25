import styles from "./Filters.module.scss";
import Input from "../Input/Input.tsx";
import {setActivePage, setFilterType, setSearchQuery, setYear} from "../../store/slice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";

const Filters = () => {
  const dispatch = useDispatch();
  const {s, y, type} = useSelector((state: RootState) => state.data.queryParams)
  const onSearchqueryChange = (search: string) => {
    dispatch(setSearchQuery(search));
    dispatch(setActivePage(1));
  }
  const onFilterTypeChange = (type: string) => {
    dispatch(setFilterType(type))
  }
  const onYearChange = (year: string) => {
    dispatch(setYear(year))
  }

  return (
    <div className={styles.filters}>
      <Input onChange={onSearchqueryChange} placeholder="Search movie" className={styles.searchInput} value={s}/>
      <Input
        placeholder="Filter by Year"
        onChange={onYearChange}
        value={y || ""}
      />
      <select value={type} onChange={(e) => onFilterTypeChange(e.target.value)}>
        <option value="movie">Movies</option>
        <option value="series">TV Series</option>
        <option value="episode">Episodes</option>
      </select>
    </div>
  );
};

export default Filters;
