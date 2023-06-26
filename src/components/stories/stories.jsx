import './stories.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStories } from '../../redux/actions/storiesAction';
import { selectStories, selectStatusStories } from '../../redux/selectors/storiesSelector';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import SkeletionStories from './skeletonstories';

function Stories() {
    const cookies = useCookies('_tk')[0]._tk;
    const user = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    const stories = useSelector(selectStories);
    const status = useSelector(selectStatusStories);

    useEffect(() => {
        dispatch(fetchStories(cookies));
    }, [dispatch, cookies])
    console.log(stories);
    return (
        <div className='stories'>
            {
                status === 'loading' ?
                    <div className="storiesWrapper">
                        {
                            [0, 1, 2, 3, 4, 5].map((item) => (
                                <SkeletionStories key={item} />
                            ))
                        }
                    </div> :
                    status === 'successed' ?
                        <div className='storiesWrapper'>
                            <Link to="/stories/create">
                                <div className='storiesItem'>
                                    <img className='storiesThumbnail' width={115} height={200} src={user.avatar} alt="" />
                                    <div className='storiesAdd'>
                                        <div className='storiesAddText'>
                                            Thêm tin
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            {
                                stories.map((item) => (
                                    <Link key={item.id} to={"/stories/view/" + item.id}>
                                        <div className='storiesItem'>
                                            <img className='storiesUserAvatar' width={50} height={50} src={item.avatar} alt="" />
                                            {
                                                item.stories[0].type === 'image' ? <img className='storiesThumbnail' width={115} height={200} src={item.stories[0].file_name_story} alt="" /> :
                                                    <video className='storiesThumbnail' width={115} height={200} src={item.stories[0].file_name_story}></video>
                                            }
                                            <div className='storiesUserName'>
                                                {item.displayName}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div> :
                        status === 'failed' ?
                            <div className="storiesWrapper">
                                {
                                    [0, 1, 2, 3, 4, 5].map((item) => (
                                        <SkeletionStories key={item} />
                                    ))
                                }
                            </div> :
                            <></>
            }
        </div>
    );
}

export default Stories;