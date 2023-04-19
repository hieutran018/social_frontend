import './member.css';
import Skeleton from '@mui/material/Skeleton';

function SkeletonMemberCard() {
    return (
        [0, 1, 2].map((item) => (
            <div key={item} className='skeletonMemberCard'>
                <Skeleton variant='circular' width={60} height={60} className='skeletonMemberCardMemberAvatar' />
                <div className='skeletonMemberCardRight'>
                    <Skeleton variant='rectangular' width={250} height={25} className="skeletonMemberCardMemberInformation" />
                    <Skeleton variant='rectangular' width={150} height={16} className='skeletonMemberCardJoinedAt' />
                </div>
            </div>
        ))
    )
}

export default SkeletonMemberCard;