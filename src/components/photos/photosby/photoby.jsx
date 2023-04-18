import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectStatusMediaFile, selectMediaFile } from "../../../redux/selectors/mediafileSelector";
import { fetchMediaFile } from "../../../redux/actions/mediafileAction";
import SkeletonPhotoBy from './skeletonPhotoBy';
import Grid from '@mui/material/Grid';

function PhotoBy() {
    const userId = useParams().userId;
    const cookies = useCookies('_tk')[0]._tk;
    const dispatch = useDispatch();
    const photos = useSelector(selectMediaFile);
    const status = useSelector(selectStatusMediaFile);
    useEffect(() => {
        dispatch(fetchMediaFile(cookies, userId));
    }, [cookies, userId, dispatch])

    return (
        <div className="photoBy">
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
            </Grid>
        </div>
    )
}

export default PhotoBy;