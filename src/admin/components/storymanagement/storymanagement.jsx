import './storymanagement.css';
import { DataGrid } from '@mui/x-data-grid';
import { TbNews } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import DetailUser from '../detailuser/detailuser';


function StoryManagement() {
    const storyId = useParams().storyId;
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'owner', headerName: 'Người dùng', width: 250 },
        { field: 'type', headerName: 'Loại', width: 250 },
        { field: 'createdAt', headerName: 'Ngày tạo', type: 'number', width: 150 },
        { field: 'expiredAt', headerName: 'Thời gian hiển thị', width: 150 },
        { field: 'viewCount', headerName: 'Lượng người xem', type: 'number', width: 150 },
        { field: 'status', headerName: 'Trạng thái', width: 100 },

    ];
    const actionColumn = [
        {
            field: "action",
            headerName: "Hành động",
            width: 320,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link style={{ textDecoration: "none" }} to={"/admin/users/detail-user/" + params.id}><div className="viewButton">Xem chi tiết</div></Link>
                        <div className="optionsButton">Tùy chỉnh</div>
                    </div>
                );
            },
        },
    ];

    const rows = [
        { id: 1, owner: 'Snow', type: 'Video/Đoạn văn', createdAt: '15/05/2023', expiredAt: '16/05/2023', viewCount: '101', status: 'Hiển thị' },
        { id: 2, owner: 'Lannister', type: 'Hình ảnh/Đoạn văn', createdAt: '15/05/2023', expiredAt: '16/05/2023', viewCount: '101', status: 'Hiển thị' },
        { id: 3, owner: 'Lannister', type: 'Video/Đoạn văn', createdAt: '15/05/2023', expiredAt: '16/05/2023', viewCount: '102', status: 'Đã ẩn' },
        { id: 4, owner: 'Stark', type: 'Hình ảnh/Đoạn văn', createdAt: '15/05/2023', expiredAt: '16/05/2023', viewCount: '2', status: 'Hiển thị' },
        { id: 5, owner: 'Targaryen', type: 'Video/Đoạn văn', createdAt: '15/05/2023', expiredAt: '16/05/2023', viewCount: '101', status: 'Hiển thị' },
        { id: 6, owner: 'Melisandre', type: 'Video/Đoạn văn', createdAt: '15/05/2023', expiredAt: '16/05/2023', viewCount: '100', status: 'Hiển thị' },
        { id: 7, owner: 'Clifford', type: 'Video/Đoạn văn', createdAt: '15/05/2023', expiredAt: '16/05/2023', viewCount: '30', status: 'Đã ẩn' },
        { id: 8, owner: 'Frances', type: 'Hình ảnh/Đoạn văn', createdAt: '15/05/2023', expiredAt: '16/05/2023', viewCount: '1', status: 'Hiển thị' },
        { id: 9, owner: 'Roxie', type: 'Video/Đoạn văn', createdAt: '15/05/2023', expiredAt: '16/05/2023', viewCount: '2', status: 'Hiển thị' },
    ];

    return (

        <div className='storyManagement'>
            {
                storyId ? <DetailUser /> :
                    <div className='storyManagementWrapper'>
                        <div className='storyManagementBreadCrumb'>
                            <div className='storyManagementIconContainer'><TbNews size={30} className='storyManagementIcon' /></div>
                            <div className='storyManagementBreadCrumbTitle'>Quản lý bản tin</div>
                        </div>
                        <div className='storyManagementSearchbar'>
                            <span className='storyManagementSearchDescription'>Tìm kiếm:</span>
                            <input className='storyManagementInputSearch' type="text" />
                            <button className='storyManagementButtonSearch'>Tìm</button>
                        </div>
                        <div className='storyManagementActionContainer'>
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
            }
        </div>
    );
}

export default StoryManagement;