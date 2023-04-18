import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

function SkeletonGroup() {
    return (
        <div>
            {
                [0, 1, 2].map((item) => (
                    <div key={item} className="skeletonGroupCard">
                        <div className='skeletonGroupContainer'>
                            <div><Skeleton className="skeletonFriendImg" variant="rectangular" width={60} height={60} /></div>
                            <div><Skeleton className="skeletonFriendName" variant="rectangular" width={150} height={20} /></div>
                        </div>
                        <div>
                            <Skeleton className="skeletonGroupButton" variant="circular" width={30} height={30} />
                        </div>
                    </div>
                ))
            }
        </div>

    );
}

export default SkeletonGroup;