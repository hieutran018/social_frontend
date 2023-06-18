import './photos.css';
import Grid from '@mui/material/Grid';
import { Link, useParams } from 'react-router-dom';
import Album from './album/album';
import PhotoBy from './photosby/photoby';
import { useDispatch, useSelector } from "react-redux";
import { selectStatusMediaFile, selectMediaFile } from "../../redux/selectors/mediafileSelector";
import { fetchMediaFilePostTag } from "../../redux/actions/mediafileAction";
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import SkeletonPhotoBy from './photosby/skeletonPhotoBy';

function Photos() {
    const { userId, category } = useParams();
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch();
    const photos = useSelector(selectMediaFile);
    const status = useSelector(selectStatusMediaFile);
    useEffect(() => {
        dispatch(fetchMediaFilePostTag(cookies, userId));
    }, [cookies, userId, dispatch])
    return (
        <div className='photosList'>
            <div className='photosWrapper'>
                <div className='photosHeader'>
                    <span className='photosTitleText'> Ảnh</span>
                </div>
                <div className='photosTabCategory'>
                    <Link className='photosLinkTab' to={"/userId/" + userId + "/photos/photos_of"}>
                        <div className={category === 'photos_of' ? 'photosTab active' : 'photosTab'}>
                            <span className='photosTabCategoryName'> Ảnh có mặt bạn</span>
                        </div>
                    </Link>
                    <Link className='photosLinkTab' to={"/userId/" + userId + "/photos/photos_by"}>
                        <div className={category === 'photos_by' ? 'photosTab active' : 'photosTab'}>
                            <span className='photosTabCategoryName'> Ảnh của bạn</span>
                        </div>
                    </Link>
                    <Link className='photosLinkTab' to={"/userId/" + userId + "/photos/album"}>
                        <div className={category === 'album' ? 'photosTab active' : 'photosTab'}>
                            <span className='photosTabCategoryName'> Album</span>
                        </div>
                    </Link>
                </div>
                <div className='photosMain'>
                    {category === 'photos_of' ?
                        <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="left" spacing={1}>
                                    {status === 'loading' ? <SkeletonPhotoBy /> : status === 'succeeded' ?
                                        photos.map((item) => (
                                            <Grid key={item.id} item>
                                                <img className='photosImageItem' src={item.media_file_name} alt="" />
                                            </Grid>

                                        )) : <SkeletonPhotoBy />}
                                </Grid>


                            </Grid>
                        </Grid> : category === 'album' ? <Album /> : <PhotoBy />}

                </div>
            </div>
        </div>
    );
}

export default Photos;