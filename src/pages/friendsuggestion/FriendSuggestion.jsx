import './friendsuggestion.css';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';


function FriendSuggestion() {
    return (
        <>
            <div>
                <Topbar />
            </div>
            <div className="friendsuggestionContainer">
                <Sidebar />

            </div>
        </>
    );
}

export default FriendSuggestion;