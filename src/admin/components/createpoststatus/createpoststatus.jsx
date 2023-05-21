import './createpoststatus.css';
import { useEffect, useState } from 'react';
import { RiEmotionLaughFill } from 'react-icons/ri';


function CreatePostStatus() {
    const [file, setFile] = useState();

    const handleChangeFile = (e) => {
        const image = e.target.files[0];
        image.preview = URL.createObjectURL(image);
        setFile(e.target.files[0])
        console.log(e.target.files);
    }
    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file.preview);
        }
    }, [file])
    return (
        <div className="createPostStatusWrapper">
            <div className='postsManagementBreadCrumb'>
                <div className='postsManagementIconContainer'><RiEmotionLaughFill size={30} className='postsManagementIcon' /></div>
                <div className='postsManagementBreadCrumbTitle'>Quản lý hoạt động và trạng thái / <span className='postsManagementBreadCrumbTitleCurrent'>Thêm hoạt động, trạng thái</span></div>
            </div>
            <div className='createPostStatusMain'>
                <div className='createPostStatusMainContainer'>
                    <div className='createPostStatusTop'>
                        <div className='createPostStatusInPutContainer'>
                            <div className='createPostStatusInput'>
                                <div className='createPostStatusDescriptionInput'>Tên hoạt động, trạng thái:</div>
                                <input className='createPostStatusContentInput' type="text" />
                            </div>
                            <div className='createPostStatusInput'>
                                <span className='createPostStatusDescriptionInput'>Tệp</span>
                                <input onChange={handleChangeFile} className='createPostStatusContentInput' type="file" title='Chọn tệp từ máy tính' />
                            </div>
                        </div>
                        <div className='createPostStatusPreviewIconContainer'>
                            <div className='createPostStatusDescriptionInput'>
                                Xem trước tệp tải lên
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {
                                    file ? <img className='createPostStatusPreviewIcon' src={file.preview} alt="" /> :
                                        <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='createPostStatusBottom'>
                        <button className='createPostStatusButtonCancel'>Quay lại</button>
                        <button className='createPostStatusButtonCreate'>Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePostStatus;