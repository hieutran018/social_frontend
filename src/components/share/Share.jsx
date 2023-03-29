import './share.css';
import { PermMedia, Room, EmojiEmotions } from "@mui/icons-material"
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAddPostStatus } from '../../redux/selectors/postSelector';

import DialogShare from './dialogshare';



function Share() {

    const [open, setOpen] = useState(false);
    const status = useSelector(selectAddPostStatus);
    const [close, setClose] = useState();

    useEffect(() => {
        setClose(false);
        handleClose()
    }, [status])
    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
    };




    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <div className='shareProfileImgContainer'>
                        <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
                    </div>
                    <div onClick={handleClickOpen} className='shareInput'>
                        <span className='shareInputText'>Bạn đang nghĩ gì thế?</span>
                    </div>
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">


                    <div onClick={handleClickOpen} className="shareOption">

                        <PermMedia htmlColor="tomato" className="shareIcon" />
                        <span className="shareOptionText">Hình ảnh/video</span>

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
            </div>
            <div>
                <Dialog
                    open={close || open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogShare />
                </Dialog>
            </div>
        </div >
    );
}

export default Share;