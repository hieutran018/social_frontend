import './friendsuggestion.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';
import ViewProfile from '../viewprofile/ViewProfile';


function FriendSuggestion() {
    return (
        <>
            <div>
                <Topbar />
            </div>
            <div className="friendsuggestionContainer">
                <Sidebar />
                <ViewProfile />
            </div>
        </>
    );
}

export default FriendSuggestion;