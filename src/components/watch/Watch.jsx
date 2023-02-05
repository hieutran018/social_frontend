import './watch.css'
import Video from '../video/Video';
import { Posts } from "../../data";

function Watch() {
    return (<div className="feed">
        <div className="feedWrapper">

            {Posts.map((p) => (
                <Video key={p.id} post={p} />
            ))}
        </div>
    </div>);
}

export default Watch;