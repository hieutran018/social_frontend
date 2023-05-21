import './poststatusmanagement.css';
import { RiEmotionLaughFill } from 'react-icons/ri';
import { MdAddReaction } from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

function PostStatus() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'feelAndActivityName', headerName: 'Tên trạng thái/Hoạt động', width: 400 },
        { field: 'createdAt', headerName: 'Ngày được thêm vào', width: 320 },
        { field: 'status', headerName: 'Trạng thái', width: 150 },

    ];
    const actionColumn = [
        {
            field: "icon",
            headerName: "Icon",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cellAction">

                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link style={{ textDecoration: "none" }} to={"/admin/post-status/edit-post-status/" + params.id}><div className="viewButton">Cập nhật</div></Link>
                        <div className="optionsButton">Tùy chỉnh</div>
                    </div>
                );
            },
        },

    ];
    const rows = [
        { id: 1, feelAndActivityName: 'buồn', createdAt: 'Ngày 15, tháng 05, năm 2023', status: 'Đang hiện', icon: 'sad.png' },
    ];
    return (
        <div className='adminPostStatus'>
            <div className='adminPostStatusWrapper'>
                <div className='adminPostStatusBreadCrumb'>
                    <div className='adminPostStatusIconContainer'><RiEmotionLaughFill size={30} className='adminPostStatusIcon' /></div>
                    <div className='adminPostStatusBreadCrumbTitle'>Quản lý cảm xúc bài viết</div>
                </div>
                <div className='adminPostStatusOption'>
                    <div className='adminPostStatusSearchbar'>
                        <span className='adminPostStatusSearchDescription'>Tìm kiếm:</span>
                        <input className='adminPostStatusInputSearch' type="text" />
                        <button className='adminPostStatusButtonSearch'>Tìm</button>
                    </div>
                    <Link className='adminUnlink' to="/admin/post-status/create-post-status">
                        <button className='adminPostStatusCreate'>
                            <MdAddReaction size={25} /> <span>Thêm Trạng thái</span>
                        </button>
                    </Link>
                </div>
                <div className='userManagementActionContainer'>
                    <div style={{ height: 650, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns.concat(actionColumn)}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PostStatus;