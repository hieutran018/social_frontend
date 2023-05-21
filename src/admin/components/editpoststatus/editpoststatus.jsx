import './editpoststatus.css';

import { useEffect, useState } from 'react';
import { RiEmotionLaughFill } from 'react-icons/ri';

function EditPostStatus() {
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
        <div className="editPostStatusWrapper">
            <div className='postsManagementBreadCrumb'>
                <div className='postsManagementIconContainer'><RiEmotionLaughFill size={30} className='postsManagementIcon' /></div>
                <div className='postsManagementBreadCrumbTitle'>Quản lý hoạt động và trạng thái / <span className='postsManagementBreadCrumbTitleCurrent'>Cập nhật hoạt động, trạng thái</span></div>
            </div>
            <div className='editPostStatusMain'>
                <div className='editPostStatusMainContainer'>
                    <div className='editPostStatusTop'>
                        <div className='editPostStatusInPutContainer'>
                            <div className='editPostStatusInput'>
                                <div className='editPostStatusDescriptionInput'>Tên hoạt động, trạng thái:</div>
                                <input className='editPostStatusContentInput' type="text" />
                            </div>
                            <div className='editPostStatusInput'>
                                <span className='editPostStatusDescriptionInput'>Tệp</span>
                                <input onChange={handleChangeFile} className='editPostStatusContentInput' type="file" title='Chọn tệp từ máy tính' />
                            </div>
                        </div>
                        <div className='editPostStatusPreviewIconContainer'>
                            <div className='editPostStatusDescriptionInput'>
                                Xem trước tệp tải lên
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {
                                    file ? <img className='editPostStatusPreviewIcon' src={file.preview} alt="" /> :
                                        <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='editPostStatusBottom'>
                        <button className='editPostStatusButtonCancel'>Quay lại</button>
                        <button className='editPostStatusButtonUpdate'>Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPostStatus;