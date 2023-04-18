import './album.css';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';


function SkeletonAlbum() {
    return (


        [0, 1].map((item) => (
            <Grid key={item} item>
                <Skeleton variant="rectangular" height={"11.95rem"} width={"11.95rem"} />
                <div className='skeletonAlbumNameContainer'>
                    <div className='skeletonAlbumInforAlbum'>
                        <Skeleton className='skeletonAlbumName' variant="rectangular" height={16} width={100} />
                        <Skeleton className='skeletonAlbumCount' variant="rectangular" height={16} width={50} />
                    </div>
                </div>
            </Grid>
        ))


    );
}

export default SkeletonAlbum;