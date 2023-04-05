import './photos.css';
import Grid from '@mui/material/Grid';
import { Link, useParams } from 'react-router-dom';
import Album from './album/album';
import PhotoBy from './photosby/photoby';

function Photos() {

    const { userId, category } = useParams();
    return (
        <div className='photosList'>
            <div className='photosWrapper'>
                <div className='photosHeader'>
                    <span className='photosTitleText'> Ảnh</span>
                </div>
                <div className='photosTabCategory'>
                    <Link className='photosLinkTab' to={"/" + userId + "/photos/photos_of"}>
                        <div className={category === 'photos_of' ? 'photosTab active' : 'photosTab'}>
                            <span className='photosTabCategoryName'> Ảnh có mặt bạn</span>
                        </div>
                    </Link>
                    <Link className='photosLinkTab' to={"/" + userId + "/photos/photos_by"}>
                        <div className={category === 'photos_by' ? 'photosTab active' : 'photosTab'}>
                            <span className='photosTabCategoryName'> Ảnh của bạn</span>
                        </div>
                    </Link>
                    <Link className='photosLinkTab' to={"/" + userId + "/photos/album"}>
                        <div className={category === 'album' ? 'photosTab active' : 'photosTab'}>
                            <span className='photosTabCategoryName'> Album</span>
                        </div>
                    </Link>
                </div>
                <div className='photosMain'>
                    {category === 'photos_of' ?
                        <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="left" spacing={1}>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                        <Grid key={value} item>
                                            <img className='photosImageItem' src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/87857085_844273819374433_4021419020736528384_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=t5JmVLMCzkEAX8rgSs8&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfAe8QAb5ZDvCPdDV7WYJyjOfQK00MgZiFU-8OZhBOyNQg&oe=6451D36C" alt="" />
                                        </Grid>

                                    ))}
                                </Grid>


                            </Grid>
                        </Grid> : category === 'album' ? <Album /> : <PhotoBy />}

                </div>
            </div>
        </div>
    );
}

export default Photos;