import './reactionspost.css';
import like from '../../rections/like.gif';
import love from '../../rections/love.gif';
import yay from '../../rections/yay.gif';
import wow from '../../rections/wow.gif';
import sad from '../../rections/sad.gif';
import haha from '../../rections/haha.gif';
import angry from '../../rections/angry.gif';

function ReactionsPost({ handleReactions }) {
    const reactions = [
        { id: 1, img: like },
        { id: 2, img: love },
        { id: 3, img: sad },
        { id: 4, img: haha },
        { id: 5, img: yay },
        { id: 6, img: wow },
        { id: 7, img: angry },
    ]
    return (
        <div className='reactionsPost'>
            <div className='reactionsPostWrapper'>
                {
                    reactions.map((reaction) => (
                        <img key={reaction.id} onClick={() => handleReactions(reaction.id)} className='reactionsPostGif' width={30} height={30} src={reaction.img} alt="" />
                    ))
                }
            </div>
        </div>
    );
}

export default ReactionsPost;