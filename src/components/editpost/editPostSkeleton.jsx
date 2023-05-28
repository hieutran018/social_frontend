import './editpost.css';
import Skeleton from '@mui/material/Skeleton';

function EditPostSkeleton() {
    return (
        <div className='editPostSkeleton'>
            <Skeleton className='postHistorySkeletonItemText' variant="rectangular" width={570} height={18} />
            <Skeleton className='postHistorySkeletonItemText' variant="rectangular" width={570} height={18} />
            <Skeleton className='postHistorySkeletonItemText' variant="rectangular" width={570} height={18} />
        </div>
    );
}

export default EditPostSkeleton;