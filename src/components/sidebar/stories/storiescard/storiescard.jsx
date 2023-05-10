import { useParams, Link } from 'react-router-dom';
import './storiescard.css';


function StoriesCard({ story }) {
    const storiesCurrent = useParams().storiesCurrent;
    return (
        <Link className='sidebarunLink' to={"/stories/view/" + story.id}>
            <div className={story.id.toString() === storiesCurrent ? 'storiesCard storiesCardSelect' : 'storiesCard'}>
                <img className='storiesCardAvatar' src={story.avatar} alt="" />
                <div className='storiesCardUserName'>{story.userName}</div>
            </div>
        </Link>
    );
}

export default StoriesCard;