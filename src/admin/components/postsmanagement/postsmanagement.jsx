import './postsmanagement.css';
import { BsFilePostFill } from 'react-icons/bs';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useParams } from 'react-router-dom';
import DetailPost from '../detailpost/detailpost';

function PostsManagement() {
    const postId = useParams().postId;
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'displayName', headerName: 'Tên người dùng', width: 250 },
        { field: 'content', headerName: 'Nội dung', width: 500 },
        { field: 'reaction', headerName: 'Lượt reaction', type: 'number', width: 140 },
        { field: 'share', headerName: 'Lượt share', type: 'number', width: 90 },
        { field: 'privacy', headerName: 'Quyền riêng tư', width: 150 },

    ];
    const actionColumn = [
        {
            field: "action",
            headerName: "Hành động",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link style={{ textDecoration: "none" }} to={"/admin/posts/detail-post/" + params.id}><div className="viewButton">Xem chi tiết</div></Link>
                        <div className="optionsButton">Tùy chỉnh</div>
                    </div>
                );
            },
        },
    ];

    const rows = [
        { id: 1, content: 'Chẳng phải cứ ở Sài Gòn xô bồ thì không thể lãng mạn khi mà mỗi góc nhỏ của Oliu', displayName: 'Snow', reaction: 10, share: 20, privacy: 'Công khai' },
        { id: 2, content: 'Chẳng phải cứ ở Sài Gòn xô bồ thì không thể lãng mạn khi mà mỗi góc nhỏ của Oliu Quán luôn được chăm chút cẩn thận để những buổi hẹn hò thêm ngọt ngào và trọn vẹn từ ẩm thực, không gian đến cảm xúc.', displayName: 'Lannister', reaction: 42, share: 0, privacy: 'Công khai' },
        { id: 3, content: 'Chẳng phải cứ ở Sài Gòn xô bồ thì không thể lãng mạn khi mà mỗi góc nhỏ của Oliu Quán luôn được chăm chút cẩn thận để những buổi hẹn hò thêm ngọt ngào và trọn vẹn từ ẩm thực, không gian đến cảm xúc.', displayName: 'Lannister', reaction: 0, share: 0, privacy: 'Riêng tư' },
        { id: 4, content: 'Chẳng phải cứ ở Sài Gòn xô bồ thì không thể lãng mạn khi mà mỗi góc nhỏ của Oliu Quán luôn được chăm chút cẩn thận để những buổi hẹn hò thêm ngọt ngào và trọn vẹn từ ẩm thực, không gian đến cảm xúc.', displayName: 'Stark', reaction: 16, share: 0, privacy: 'Riêng tư' },
        { id: 5, content: 'Chẳng phải cứ ở Sài Gòn xô bồ thì không thể lãng mạn khi mà mỗi góc nhỏ của Oliu Quán luôn được chăm chút cẩn thận để những buổi hẹn hò thêm ngọt ngào và trọn vẹn từ ẩm thực, không gian đến cảm xúc.', displayName: 'Targaryen', reaction: 0, share: 10, privacy: 'Riêng tư' },
        { id: 6, content: 'Chẳng phải cứ ở Sài Gòn xô bồ thì không thể lãng mạn khi mà mỗi góc nhỏ của Oliu Quán luôn được chăm chút cẩn thận để những buổi hẹn hò thêm ngọt ngào và trọn vẹn từ ẩm thực, không gian đến cảm xúc.', displayName: 'Melisandre', reaction: 21, share: 5, privacy: 'Bạn bè' },
        { id: 7, content: 'Chẳng phải cứ ở Sài Gòn xô bồ thì không thể lãng mạn khi mà mỗi góc nhỏ của Oliu Quán luôn được chăm chút cẩn thận để những buổi hẹn hò thêm ngọt ngào và trọn vẹn từ ẩm thực, không gian đến cảm xúc.', displayName: 'Clifford', reaction: 44, share: 2, privacy: 'Công khai' },
        { id: 8, content: 'Chẳng phải cứ ở Sài Gòn xô bồ thì không thể lãng mạn khi mà mỗi góc nhỏ của Oliu Quán luôn được chăm chút cẩn thận để những buổi hẹn hò thêm ngọt ngào và trọn vẹn từ ẩm thực, không gian đến cảm xúc.', displayName: 'Frances', reaction: 36, share: 100, privacy: 'Bạn bè' },
        { id: 9, content: 'Chẳng phải cứ ở Sài Gòn xô bồ thì không thể lãng mạn khi mà mỗi góc nhỏ của Oliu Quán luôn được chăm chút cẩn thận để những buổi hẹn hò thêm ngọt ngào và trọn vẹn từ ẩm thực, không gian đến cảm xúc.', displayName: 'Roxie', reaction: 65, share: 1000, privacy: 'Riêng tư' },
    ];

    return (
        <div className='postsManagement'>
            {
                postId ?
                    <DetailPost /> :
                    <div className='postsManagementWrapper'>
                        <div className='postsManagementBreadCrumb'>
                            <div className='postsManagementIconContainer'><BsFilePostFill size={30} className='postsManagementIcon' /></div>
                            <div className='postsManagementBreadCrumbTitle'>Quản lý bài viết</div>
                        </div>
                        <div className='postsManagementSearchbar'>
                            <span className='postsManagementSearchDescription'>Tìm kiếm:</span>
                            <input className='postsManagementInputSearch' type="text" />
                            <button className='postsManagementButtonSearch'>Tìm</button>
                        </div>
                        <div className='postsManagementActionContainer'>
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

export default PostsManagement;