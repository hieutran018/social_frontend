import './postsmanagement.css';
import { BsFilePostFill } from 'react-icons/bs';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useParams } from 'react-router-dom';
import DetailPost from '../detailpost/detailpost';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../redux/admin/actions/adminPostAction';
import { adminSelectPosts, adminSelectPostsStatus } from '../../../redux/admin/selectors/adminPostSelector';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function PostsManagement() {
    const postId = useParams().postId;
    const cookies = useCookies('tk')[0].tk;
    const dispatch = useDispatch();
    const posts = useSelector(adminSelectPosts);
    const status = useSelector(adminSelectPostsStatus);
    useEffect(() => {
        dispatch(fetchPosts(cookies));
    }, [dispatch, cookies])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'userName', headerName: 'Tên người dùng', width: 250 },
        { field: 'post_content', headerName: 'Nội dung', width: 400 },
        { field: 'type', headerName: 'Loại bài viết', width: 100 },
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
                            <div style={{ height: 650, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    status === 'loading' ?
                                        <div>
                                            Đang tải dữ liệu danh sách bài viết
                                        </div> :
                                        status === 'successed' ?
                                            <DataGrid

                                                rows={posts}
                                                columns={columns.concat(actionColumn)}
                                                initialState={{
                                                    pagination: {
                                                        paginationModel: { page: 0, pageSize: 5 },
                                                    },
                                                }}
                                                pageSizeOptions={[5, 10]}
                                            /> :
                                            <div> Tải dữ liệu danh sách bài viết thất bại!</div>
                                }
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
}

export default PostsManagement;