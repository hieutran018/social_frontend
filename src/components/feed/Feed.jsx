import Post from "../post/Post";
import './feed.css';


function Feed({ post }) {

    return (
        <div className="feed">
            <div className="feedWrapper">
                {
                    post.map((p) => (
                        <Post key={p.id} post={p} groups={true} />
                    ))
                }
            </div>
        </div>);
}

export default Feed;