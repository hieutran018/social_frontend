import './search.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchResult from '../../components/searchresult/searchresult';
import { useParams } from 'react-router-dom';

function Search() {
    const result = useParams().result;
    console.log(result);
    return (
        <div className='searchPage'>
            <SearchResult />
        </div>
    );
}

export default Search;