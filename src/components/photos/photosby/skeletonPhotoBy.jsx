import './photoby.css';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

function SkeletonPhotoBy() {
    return (
        [0, 1, 2].map((item) => (
            <Grid key={item} item>
                <Skeleton className='skeletonPhotosImageItem' width={"11.95rem"} height={"11.95rem"} variant='rectangular' />
            </Grid>

        ))
    )
}

export default SkeletonPhotoBy;