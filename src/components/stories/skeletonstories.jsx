import Skeleton from '@mui/material/Skeleton';

function SkeletionStories() {
    return (
        <div className="skeletonStories">
            <div>
                <Skeleton className='skeletonStoriesItem' variant="rectangular" width={115} height={200} />
            </div>
        </div>
    );
}

export default SkeletionStories;