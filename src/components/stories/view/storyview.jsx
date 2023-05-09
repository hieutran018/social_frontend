import './view.css';
import image from '../../../ckc_social_logo.png'

function StoryView({ url, type }) {
    return (
        <div className="storyView">
            <div className='storyViewMediaContainer'>
                <div className='storyViewUserInfo'>
                    <div>
                        <img className='storyViewUserAvatar' src={image} alt="" />
                    </div>
                    <div className='storyViewUserName'>
                        Trần Dương Chí Hiếu
                    </div>
                </div>
                <div className='storyViewMediaMain'>
                    {
                        type === 'video' ?
                            <video className={
                                'squareSizeView'} controls src=
                                ''></video> :
                            <img className={
                                'squareSizeView'
                            } src={image} alt="" />
                    }
                </div>
            </div>
        </div>
    );
}
export default StoryView;