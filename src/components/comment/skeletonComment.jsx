import Skeleton from '@mui/material/Skeleton';
function SkeletonCommentPost() {
    return (
        <Skeleton className='skeletonCommentPost' variant="rectangular" color={"#F0F2F5"} width={"100%"} height={"5rem"} />
    );
}

export default SkeletonCommentPost;