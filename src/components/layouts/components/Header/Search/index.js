import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames  from 'classnames/bind'
import style from './search.module.scss'
const cx= classNames.bind(style)
function Search() {
    return (
            <div  className={cx("container-input")}>
                <FontAwesomeIcon className={cx('icon-search')} icon={faSearch}/>
                <input  placeholder="Tìm kiếm"/>
            </div>
     );
}

export default Search;