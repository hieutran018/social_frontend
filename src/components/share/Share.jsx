import './share.css';
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import { useState } from 'react';
import axios from 'axios';

function Share() {
    const [files, setFiles] = useState([]);
    const [inputContentPost, setInputContentPost] = useState('');
    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles(e.target.files);

        }
    };

    const handleChangeContent = (e) => {
        setInputContentPost(e.target.value)
    }

    const submitPost = () => {
        if (inputContentPost === '') {
            return;
        }
        const requestURL = "http://127.0.0.1:8000/api/v1/create-post";
        const token = JSON.parse(sessionStorage.getItem('token'));
        axios({
            method: 'POST', //you can set what request you want to be
            url: requestURL,
            data: { postContent: inputContentPost, files: files },
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => console.log(response)).catch((error) => console.log(error));
        setInputContentPost('');
    }



    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
                    <textarea onChange={handleChangeContent}
                        placeholder="Hiếu ơi, bạn đang nghĩ gì thế?"
                        className="shareInput" rows="3"
                    ></textarea>
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor="uploadFiles" className="shareOption">

                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Hình ảnh/video</span>
                            <input multiple onChange={handleFileChange} id='uploadFiles' type="file" style={{ display: "none" }} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Gắn thẻ</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Địa điểm</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Trạng thái</span>
                        </div>
                    </div>
                    <button onClick={submitPost} className="shareButton">Chia sẻ</button>
                </div>
            </div>
        </div>
    );
}

export default Share;