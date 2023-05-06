import './stories.css';
import image from '../../ckc_social_logo.png';
import { Link } from 'react-router-dom';

function Stories() {
    return (
        <div className='stories'>
            <div className='storiesWrapper'>
                <Link to="/stories/create">
                    <div className='storiesItem'>

                        <img className='storiesThumbnail' width={115} height={200} src={image} alt="" />
                        <div className='storiesAdd'>
                            <div className='storiesAddText'>
                                Thêm tin
                            </div>
                        </div>
                    </div></Link>
                {
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => (
                        <div key={item} className='storiesItem'>
                            <img className='storiesUserAvatar' width={50} height={50} src={image} alt="" />
                            <img className='storiesThumbnail' width={115} height={200} src={image} alt="" />
                            <div className='storiesUserName'>
                                Tran Duong Chi Hieu
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Stories;