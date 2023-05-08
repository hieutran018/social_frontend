import './create.css';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { BsPersonVideo2 } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateStory() {
    const cookies = useCookies('_tk')[0]._tk;
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [type, setType] = useState('');
    const [size, setSize] = useState('');

    const handleChangeOption = (option) => {
        setType(option);
        console.log(option);
    }
    const handleChangeFile = (event) => {

        const thisFile = event.target.files[0];
        thisFile.preview = URL.createObjectURL(thisFile);
        setFile(event.target.files);
        const reader = new FileReader();
        reader.readAsDataURL(thisFile);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                if (img.naturalWidth === img.naturalHeight || img.naturalWidth > img.naturalHeight) {
                    setSize('square');
                } else {
                    setSize('rectangle');
                }
            };
        };
    }
    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file.preview);

        }
    })

    const handleSubmit = () => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/stories/create-story';
        axios({
            method: 'POST',
            url: requestURL,
            data: {
                file: file, type: type
            },
            headers: {
                Authorization: 'Bearer ' + cookies,
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log(response.data);
            navigate('/')
        }).catch((error) => {
            console.log(error);
        });
    }
    const handleCancel = () => {
        setFile()
    }
    console.log(type);
    return (
        <div className='createStory'>
            {
                !file ?
                    <div className="createStoryWrapper">
                        <div onClick={() => handleChangeOption('image')} className='createStoryOptions storyPhoto'>
                            <label htmlFor='uploadFilesImage' onChange={handleChangeFile} className='createStoryDescription '>
                                <input type="file" id="uploadFilesImage" accept="image/*" hidden />
                                <div className='createStoryDescriptionIcon'>
                                    <MdOutlineAddAPhoto size={40} color='black' />
                                </div>
                                <span className='createStoryDescriptionText'>Thêm một hình ảnh/Đoạn văn</span>
                            </label>
                        </div>
                        <div onClick={() => handleChangeOption('video')} className='createStoryOptions storyVideo'>
                            <label htmlFor='uploadFilesVideo' onChange={handleChangeFile} className='createStoryDescription'>
                                <input type="file" id="uploadFilesVideo" accept="video/*" hidden />
                                <div className='createStoryDescriptionIcon'>
                                    <BsPersonVideo2 size={40} color='black' />
                                </div>
                                <span className='createStoryDescriptionText'>Thêm một Video/Đoạn văn</span>
                            </label>

                        </div>
                    </div> :
                    <div className="createStoryWrapper">
                        <div className='createStoryPreview'>
                            <div className='createStoryPreviewTitle'>Tùy chọn xem trước
                                <div style={{ marginRight: "1rem" }}>
                                    <IoMdSettings size={30} />
                                </div>
                            </div>
                            <div className='createStoryPreviewMain'>
                                <div className='createStoryMediaContainer'>
                                    {
                                        type === 'video' ?
                                            <video className={
                                                size === 'square' ? 'squareSize' : 'rectangle'} controls src={URL.createObjectURL(file[0])}></video> :
                                            <img className={
                                                size === 'square' ? 'squareSize' : 'rectangle'
                                            } src={URL.createObjectURL(file[0])} alt="" />
                                    }
                                </div>
                                <div className='createStoryButton'>
                                    <div onClick={handleCancel} className='createStoryButtonCancle'>Hủy</div>
                                    <div onClick={handleSubmit} className='createStoryButtonSubmit'>Đăng</div>
                                </div>
                            </div>

                        </div>
                    </div>

            }
        </div>


    )
}
export default CreateStory;