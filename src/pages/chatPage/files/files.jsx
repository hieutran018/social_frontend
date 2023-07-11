import './files.css';
import file from '../../../ckc_social_logo.png';

function Files({ conversation }) {
    return (
        <div className='chatPageFileList'>
            {
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
                    <img key={item} className='chatPageFileItems' src={file} alt="" />
                ))
            }
        </div>
    )
}

export default Files;