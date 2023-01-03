import Post from "../post/Post";
import './feed.css';
import { Posts } from "../../data";
import Share from "../share/Share";

function Feed() {
    return (<div className="feed">
        <div className="feedWrapper">
            <Share />
            {Posts.map((p) => (
                <Post key={p.id} post={p} />
            ))}
        </div>
    </div>);
}

export default Feed;