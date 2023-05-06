import './create.css';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { BsPersonVideo2 } from 'react-icons/bs';

function CreateStory() {
    return (
        <div className='createStory'>
            <div className="createStoryWrapper">
                <div className='createStoryOptions storyPhoto'>
                    <div className='createStoryDescription '>
                        <div className='createStoryDescriptionIcon'>
                            <MdOutlineAddAPhoto size={40} color='black' />
                        </div>
                        <span className='createStoryDescriptionText'>Thêm một hình ảnh/Đoạn văn</span>
                    </div>
                </div>
                <div className='createStoryOptions storyVideo'>
                    <div className='createStoryDescription'>
                        <div className='createStoryDescriptionIcon'>
                            <BsPersonVideo2 size={40} color='black' />
                        </div>
                        <span className='createStoryDescriptionText'>Thêm một Video/Đoạn văn</span>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default CreateStory;