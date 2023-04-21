import './search.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchResult from '../../components/searchresult/searchresult';
import { useParams } from 'react-router-dom';


function Search() {
    const result = useParams().result;
    console.log(result);
    return (
        <div>
            <div className="searchTopbar">
                <Topbar />
            </div>
            <div className='searchContainer'>
                <Sidebar page={6} />
                <div className='searchResultContainer'>
                    <SearchResult />
                </div>
            </div>
        </div>
    );
}

export default Search;