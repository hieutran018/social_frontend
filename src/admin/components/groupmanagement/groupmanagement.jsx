import './groupmanagement.css';
import { DataGrid } from '@mui/x-data-grid';
import { HiUserGroup } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import DetailGroup from '../detailgroup/detailgroup';


function GroupManagement() {
    const groupId = useParams().groupId;
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'groupName', headerName: 'Tên nhóm', width: 250 },
        { field: 'owner', headerName: 'Người sở hữu', width: 250 },
        { field: 'members', headerName: 'Thành viên', type: 'number', width: 90 },
        { field: 'privacy', headerName: 'Quyền riêng tư', width: 90 },
        { field: 'status', headerName: 'Trạng thái', width: 150 },
        { field: 'createdAt', headerName: 'Ngày tạo', width: 250 },

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

    const rows = [
        { id: 1, groupName: 'Nhóm 1', owner: 'Snow', members: 35, privacy: 'Công khai', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 2, groupName: 'Nhóm 2', owner: 'Lannister', members: 42, privacy: 'Công khai', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 3, groupName: 'Nhóm 3', owner: 'Lannister', members: 45, privacy: 'Riêng tư', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 4, groupName: 'Nhóm 4', owner: 'Stark', members: 16, privacy: 'Công Khai', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 5, groupName: 'Nhóm 5', owner: 'Targaryen', members: 20, privacy: 'Công Khai', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 6, groupName: 'Nhóm 6', owner: 'Melisandre', members: 21, privacy: 'Công Khai', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 7, groupName: 'Nhóm 7', owner: 'Clifford', members: 44, privacy: 'Công Khai', status: 'Dừng hoạt động', createdAt: '10/05/2023' },
        { id: 8, groupName: 'Nhóm 8', owner: 'Frances', members: 36, privacy: 'Công Khai', status: 'Hoạt động', createdAt: '10/05/2023' },
        { id: 9, groupName: 'Nhóm 9', owner: 'Roxie', members: 65, privacy: 'Riêng tư', status: 'Dừng hoạt động', createdAt: '10/05/2023' },
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

export default GroupManagement;