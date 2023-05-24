import './usermanagement.css';
import { DataGrid } from '@mui/x-data-grid';
import { RiFolderUserFill } from 'react-icons/ri';
import Lottie from 'react-lottie-player';
import FetchingData from '../../../lottiefiles/fetching_data.json';
import { Link, useParams } from 'react-router-dom';
import DetailUser from '../detailuser/detailuser';
import { useDispatch, useSelector } from 'react-redux';
import { adminSelectUsers, adminSelectUsersStatus } from '../../../redux/admin/selectors/adminUserSelector';
import { fetchUsers } from '../../../redux/admin/actions/adminUserAction';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

function UserManagement() {
    const userId = useParams().userId;
    const cookies = useCookies('tk')[0].tk;
    const dispatch = useDispatch();
    const users = useSelector(adminSelectUsers);
    const status = useSelector(adminSelectUsersStatus);

    useEffect(() => {
        dispatch(fetchUsers(cookies));
        console.log(users);
    }, [dispatch, cookies])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70, align: 'center', headerAlign: 'center', },
        { field: 'email', headerName: 'Email', width: 250, align: 'center', headerAlign: 'center', },
        { field: 'displayName', headerName: 'Tên người dùng', width: 250, align: 'center', headerAlign: 'center', },
        { field: 'age', headerName: 'Tuổi', type: 'number', width: 90, align: 'center', headerAlign: 'center', },
        { field: 'sex', headerName: 'Giới tính', type: 'number', width: 90, align: 'center', headerAlign: 'center', },
        { field: 'phone', headerName: 'Số điện thoại', width: 150, align: 'center', headerAlign: 'center', },
        { field: 'address', headerName: 'Địa chỉ', width: 250, align: 'center', headerAlign: 'center', },

    ];
    const actionColumn = [
        {
            field: "action",
            headerName: "Hành động",
            width: 250,
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

    return (

        <div className='userManagement'>
            {
                userId ? <DetailUser /> :
                    <div className='userManagementWrapper'>
                        <div className='userManagementBreadCrumb'>
                            <div className='userManagementIconContainer'><RiFolderUserFill size={30} className='userManagementIcon' /></div>
                            <div className='userManagementBreadCrumbTitle'>Quản lý người dùng</div>
                        </div>
                        <div className='userManagementSearchbar'>
                            <span className='userManagementSearchDescription'>Tìm kiếm:</span>
                            <input className='userManagementInputSearch' type="text" />
                            <button className='userManagementButtonSearch'>Tìm</button>
                        </div>
                        <div className='userManagementActionContainer'>
                            <div style={{ height: 650, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    status === 'loading' ?
                                        <div>
                                            Đang tải dữ liệu danh sách người dùng
                                        </div> :
                                        status === 'successed' ?
                                            <DataGrid

                                                rows={users}
                                                columns={columns.concat(actionColumn)}
                                                initialState={{
                                                    pagination: {
                                                        paginationModel: { page: 0, pageSize: 5 },
                                                    },
                                                }}
                                                pageSizeOptions={[5, 10]}
                                            /> :
                                            <div>Tải dữ liệu danh sách người dùng thất bại!</div>
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default UserManagement;