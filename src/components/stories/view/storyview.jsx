import { useEffect, useState } from 'react';
import './view.css';

function StoryView({ story }) {
    const [size, setSize] = useState('');

    useEffect(() => {
        const img = new Image();
        img.src = story[0].file_name_story;
        img.onload = function () {
            const w = this.width;
            const h = this.height;
            if (w === h || w > h) {
                setSize('square')
            } else {
                setSize('rectangle')
            }
        }
    }, [story])

    return (
        <div className="storyView">
            <div className='storyViewMediaContainer'>
                <div className='storyViewUserInfo'>
                    <div>
                        <img className='storyViewUserAvatar' src={story[0].avatar} alt="" />
                    </div>
                    <div className='storyViewUserName'>
                        {story[0].userName}
                    </div>
                </div>
                <div className='storyViewMediaMain'>
                    {
                        story[0].type === 'video' ?
                            <video autoplay="autoplay" className={
                                size === 'square' ? 'squareSizeView' : 'rectangleView'} src={story[0].file_name_story}></video> :
                            <img className={size === 'square' ? 'squareSizeView' : 'rectangleView'} src={story[0].file_name_story} alt="" />
                    }
                </div>
            </div>
        </div>
    );
}
export default StoryView;