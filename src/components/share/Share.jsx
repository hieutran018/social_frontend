import './share.css';
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"

function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
                    <textarea
                        placeholder="Hiếu ơi, bạn đang nghĩ gì thế?"
                        className="shareInput" rows="3"
                    ></textarea>
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Hình ảnh/video</span>
                        </div>
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
                    <button className="shareButton">Chia sẻ</button>
                </div>
            </div>
        </div>
    );
}

export default Share;