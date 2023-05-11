import './reactionspost.css';
import like from '../../rections/like.gif';
import love from '../../rections/love.gif';
import yay from '../../rections/yay.gif';
import wow from '../../rections/wow.gif';
import sad from '../../rections/sad.gif';
import haha from '../../rections/haha.gif';
import angry from '../../rections/angry.gif';

function ReactionsPost() {
    const reactions = [
        { id: "like", img: like },
        { id: "love", img: love },
        { id: "yay", img: yay },
        { id: "wow", img: wow },
        { id: "sad", img: sad },
        { id: "haha", img: haha },
        { id: "angry", img: angry },
    ]
    return (
        <div className='reactionsPost'>
            <div className='reactionsPostWrapper'>
                {
                    reactions.map((reaction) => (
                        <img className='reactionsPostGif' width={30} height={30} src={reaction.img} alt="" />
                    ))
                }
            </div>
        </div>
    );
}

export default ReactionsPost;