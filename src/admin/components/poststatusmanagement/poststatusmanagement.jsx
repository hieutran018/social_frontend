import './poststatusmanagement.css';
import { RiEmotionLaughFill } from 'react-icons/ri';
import { MdAddReaction } from 'react-icons/md';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFAAs } from '../../../redux/admin/actions/adminFeelAndActivityAction';
import { adminSelectFAAsStatus, adminSelectFAAs } from '../../../redux/admin/selectors/adminFeelAndActivitySelector';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function PostStatus() {
    const cookies = useCookies('tk')[0].tk;
    const dispatch = useDispatch();
    const faas = useSelector(adminSelectFAAs);
    const status = useSelector(adminSelectFAAsStatus);
    useEffect(() => {
        dispatch(fetchFAAs(cookies));
    }, [dispatch, cookies])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'icon_name', headerName: 'Tên trạng thái/Hoạt động', width: 400 },
        { field: 'created_at', headerName: 'Ngày được thêm vào', width: 320 },
        { field: 'status', headerName: 'Trạng thái', width: 150 },

    ];
    const actionColumn = [
        {
            field: "patch",
            headerName: "Icon",
            align: 'center',
            width: 250,
            renderCell: (params) => {
                console.log(params);
                return (
                    <div className="cellAction">
                        <img width={25} height={25} src={params.formattedValue} alt="" />
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
                    <div style={{ height: 650, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            status === 'loading' ?
                                <div>
                                    Đang tải dữ liệu danh sách bài viết
                                </div> :
                                status === 'successed' ?
                                    <DataGrid
                                        rows={faas}
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

        </div>
    );
}

export default PostStatus;