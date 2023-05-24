import './groupmanagement.css';
import { DataGrid } from '@mui/x-data-grid';
import { HiUserGroup } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import DetailGroup from '../detailgroup/detailgroup';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../../../redux/admin/actions/adminGroupAction';
import { adminSelectGroups, adminSelectGroupsStatus } from '../../../redux/admin/selectors/adminGroupSelector';
import { useEffect } from 'react';


function GroupManagement() {
    const groupId = useParams().groupId;
    const cookies = useCookies('tk')[0].tk;
    const dispatch = useDispatch();
    const groups = useSelector(adminSelectGroups);
    const status = useSelector(adminSelectGroupsStatus);
    useEffect(() => {
        dispatch(fetchGroups(cookies));
    }, [dispatch, cookies])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'group_name', headerName: 'Tên nhóm', width: 250 },
        { field: 'owner', headerName: 'Người sở hữu', width: 250 },
        { field: 'members', headerName: 'Thành viên', type: 'number', width: 90 },
        { field: 'privacy', headerName: 'Quyền riêng tư', width: 150 },
        { field: 'status', headerName: 'Trạng thái', width: 150 },
        { field: 'created_at', headerName: 'Ngày tạo', width: 250 },

    ];
    const actionColumn = [
        {
            field: "action",
            headerName: "Hành động",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link style={{ textDecoration: "none" }} to={"/admin/groups/detail-group/" + params.id}><div className="viewButton">Xem chi tiết</div></Link>
                        <div className="optionsButton">Tùy chỉnh</div>
                    </div>
                );
            },
        },
    ];

    return (

        <div className='groupManagement'>
            {
                groupId ? <DetailGroup /> :
                    <div className='groupManagementWrapper'>
                        <div className='groupManagementBreadCrumb'>
                            <div className='groupManagementIconContainer'><HiUserGroup size={30} className='groupManagementIcon' /></div>
                            <div className='groupManagementBreadCrumbTitle'>Quản lý người dùng</div>
                        </div>
                        <div className='groupManagementSearchbar'>
                            <span className='groupManagementSearchDescription'>Tìm kiếm:</span>
                            <input className='groupManagementInputSearch' type="text" />
                            <button className='groupManagementButtonSearch'>Tìm</button>
                        </div>
                        <div className='groupManagementActionContainer'>
                            <div style={{ height: 650, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    status === 'loading' ?
                                        <div>
                                            Đang tải dữ liệu danh sách nhóm
                                        </div> :
                                        status === 'successed' ?
                                            <DataGrid
                                                rows={groups}
                                                columns={columns.concat(actionColumn)}
                                                initialState={{
                                                    pagination: {
                                                        paginationModel: { page: 0, pageSize: 5 },
                                                    },
                                                }}
                                                pageSizeOptions={[5, 10]}
                                            /> :
                                            <div> Tải dữ liệu danh sách nhóm thất bại!</div>
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default GroupManagement;