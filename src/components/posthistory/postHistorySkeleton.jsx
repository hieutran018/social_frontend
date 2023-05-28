import './posthistory.css';
import Skeleton from '@mui/material/Skeleton';

function PostHistorySkeleton() {
    return (
        <div className='postHistorySkeleton'>
            <div className='postHistorySkeletonWrapper'>
                <Skeleton variant="rectangular" width={250} height={20} />
                <div className='postHistorySkeletonMain'>
                    <div className='postHistorySkeletonMainTop'>
                        <Skeleton className='skeletonAvatar' variant="circular" width={50} height={50} />
                        <Skeleton className='skeletonName' variant="rectangular" width={250} height={20} />
                    </div>
                    <div className='postHistorySkeletonMainBottom'>
                        <Skeleton className='postHistorySkeletonItemText' variant="rectangular" width={535} height={18} />
                        <Skeleton className='postHistorySkeletonItemText' variant="rectangular" width={535} height={18} />
                        <Skeleton className='postHistorySkeletonItemText' variant="rectangular" width={277} height={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostHistorySkeleton;