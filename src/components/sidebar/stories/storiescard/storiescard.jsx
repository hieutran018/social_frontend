import './storiescard.css';
import image from '../../../../ckc_social_logo.png';


function StoriesCard() {
    return (
        <div className='storiesCard'>
            <img className='storiesCardAvatar' src={image} alt="" />
            <div className='storiesCardUserName'>Trần Dương Chí Hiếu</div>
        </div>
    );
}

export default StoriesCard;