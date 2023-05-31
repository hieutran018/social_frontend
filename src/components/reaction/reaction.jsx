import './reaction.css';
import likeImg from '../../rections/like.png';
import loveImg from '../../rections/love.png';
import yayImg from '../../rections/yay.png';
import wowImg from '../../rections/wow.png';
import sadImg from '../../rections/sad.png';
import hahaImg from '../../rections/haha.png';
import angryImg from '../../rections/angry.png';

function ReactionButton({ reaction }) {
    const reactions = [
        { id: 1, img: likeImg },
        { id: 2, img: loveImg },
        { id: 3, img: sadImg },
        { id: 4, img: hahaImg },
        { id: 5, img: yayImg },
        { id: 6, img: wowImg },
        { id: 7, img: angryImg },
    ]
    return (
        <div className='reactionButton'>
            {parseInt(reaction.type) === 1 ? <img className="postIconReactions" src={reactions[0].img} alt="" /> :
                parseInt(reaction.type) === 2 ? <img className="postIconReactions" src={reactions[1].img} alt="" /> : reaction.type === 7 ? <img className="postIconReactions" src={reactions[0].img} alt="" /> :
                    parseInt(reaction.type) === 3 ? <img className="postIconReactions" src={reactions[2].img} alt="" /> :
                        parseInt(reaction.type) === 4 ? <img className="postIconReactions" src={reactions[3].img} alt="" /> :
                            parseInt(reaction.type) === 5 ? <img className="postIconReactions" src={reactions[4].img} alt="" /> :
                                parseInt(reaction.type) === 6 ? <img className="postIconReactions" src={reactions[5].img} alt="" /> :
                                    <img className="postIconReactions" src={reactions[6].img} alt="" />}
        </div>
    );
}

export default ReactionButton;