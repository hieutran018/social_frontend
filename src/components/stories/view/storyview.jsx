import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './view.css';
import { GrPrevious, GrFormNext } from 'react-icons/gr';

function StoryView({ story }) {
    console.log(story[0]);
    const [size, setSize] = useState('');
    const [item, setItem] = useState(0);
    const handlePreviousItem = () => {
        setItem(item - 1);
    }
    const handleNextItem = () => {
        if (item + 1 === story[0].stories.length) {
            setItem(item);
        } else {
            setItem(item + 1);
        }
    }
    useEffect(() => {
        const img = new Image();
        img.src = story[0].stories[item] ? story[0].stories[item].file_name_story : "";
        img.onload = function () {
            const w = this.width;
            const h = this.height;
            if (w === h || w > h) {
                setSize('square');
            } else {
                setSize('rectangle');
            }
        }
    }, [story, item])

    // Reset item
    useEffect(() => {
        setItem(0);
    }, [story])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        pauseOnHover: false,
        afterChange: () => handleNextItem(),
    };

    return (
        <div className="storyView">

            <div className='storyViewButtonSlide'>{
                item === 0 ? <div style={{ width: "50px" }}></div> :
                    <div style={{ width: "50px" }} onClick={handlePreviousItem} className='storyViewButtonSlideContainer'><GrPrevious color='white' className='storyViewButtonIconSlide' size={25} /></div>
            }
            </div>

            <div className='storyViewMediaContainer'>
                <div className='storyViewUserInfo'>
                    <div>
                        <img className='storyViewUserAvatar' src={story[0].avatar} alt="" />
                    </div>
                    <div className='storyViewUserName'>
                        {story[0].displayName}
                    </div>
                </div>

                <div className='storyViewMediaMain'>
                    <Slider {...settings}>
                        {
                            story[0].stories[item] ?
                                story[0].stories[item].type === 'video' ?
                                    <video autoplay="autoplay" className={
                                        size === 'square' ? 'squareSizeView' : 'rectangleView'} src={story[0].stories[item].file_name_story}></video> :
                                    <img className={size === 'square' ? 'squareSizeView' : 'rectangleView'} src={story[0].stories[item].file_name_story} alt="" />
                                : <></>
                        }
                    </Slider>
                </div>

            </div>

            <div className='storyViewButtonSlide'><div style={{ width: "50px" }} onClick={handleNextItem} className="storyViewButtonSlideContainer"><GrFormNext className='storyViewButtonIconSlide' size={25} /></div></div>

        </div>
    );
}
export default StoryView;