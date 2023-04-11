import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import './feed.css'

function Variants() {
    return (
        <Stack spacing={3}>
            <div className='skeleton'>
                <div className='skeletonTop'>
                    <div>
                        <Skeleton className='skeletonAvatar' variant="circular" width={50} height={50} />
                    </div>
                    <div>
                        <Skeleton className='skeletonName' variant="rectangular" width={250} height={15} />
                    </div>
                </div>

                <div className='skeletonContainer'>
                    <div>
                        <Skeleton className='skeletonText' variant="rectangular" width={700} height={15} />
                    </div>
                    <div>
                        <Skeleton className='skeletonText' variant="rectangular" width={650} height={15} />
                    </div>
                    <div>
                        <Skeleton className='skeletonText' variant="rectangular" width={600} height={15} />
                    </div>
                </div>

            </div>

        </Stack>
    );
}
export default Variants