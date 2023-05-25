import './posthistory.css';
import avatar from '../../ckc_social_logo.png';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostHistory } from '../../redux/actions/postHistoryAction';
import { selectStatusPostHistories, selectPostHistories } from '../../redux/selectors/postHistorySelector';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function PostHistory({ postId }) {
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch();
    const histories = useSelector(selectPostHistories);
    const status = useSelector(selectStatusPostHistories);
    useEffect(() => {
        dispatch(fetchPostHistory(cookies, postId));
    }, [dispatch, cookies, postId])
    console.log(histories);
    return (
        <div className='postHistoryList'>
            {
                status === 'loading' ?
                    <>LOADING</> :
                    status === 'succeeded' ?
                        histories.map((history) => (
                            <div key={history.id} className='postHistoryCard'>
                                <div className='postHistoryCardWrapper'>
                                    <div className='postHistoryUpdatedAt'>
                                        Hôm nay lúc 12:00
                                    </div>
                                    <div className='postHistoryMain'>
                                        <div className="postHistoryMainTop">
                                            <img className='postHistoryUserAvatar' src={history.avatarUser} alt="" />
                                            <div className='postHistoryUserName'> {history.displayName}</div>
                                        </div>
                                        <div className='postHistoryMainBottom'>
                                            <div className='postHistoryContent'>
                                                {history.post_content}
                                            </div>
                                            <div className='postHistoryMediaFiles'>
                                                <Grid sx={{ flexGrow: 1 }} container spacing={0.1}>
                                                    <Grid item xs={12}>
                                                        <Grid container justifyContent="left" spacing={0.5}>
                                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                                                <Grid key={value} item>
                                                                    <img className='postHistoryMediaFileItem' src={avatar} alt="" />
                                                                </Grid>

                                                            ))}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <>FAILED</>
            }
        </div>
    );
}

export default PostHistory;