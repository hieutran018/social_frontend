import './album.css'

import Grid from '@mui/material/Grid';
function Album() {
    return (
        <div className='album'>
            <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                <Grid item xs={12}>
                    <Grid container justifyContent="left" spacing={1}>
                        {[0, 1, 2].map((value) => (
                            <Grid key={value} item>
                                <img className='photosImageItem' src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/87857085_844273819374433_4021419020736528384_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=t5JmVLMCzkEAX8rgSs8&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfAe8QAb5ZDvCPdDV7WYJyjOfQK00MgZiFU-8OZhBOyNQg&oe=6451D36C" alt="" />
                                <div className='albumNameContainer'><span className='albumName'>{value === 0 ? 'Ảnh đại diện' : value === 1 ? 'Tên tùy chọn' : 'Ảnh bìa'}</span></div>
                            </Grid>
                        ))}
                    </Grid>


                </Grid>
            </Grid>
        </div>
    )
}

export default Album;