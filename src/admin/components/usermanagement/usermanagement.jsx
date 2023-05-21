import './usermanagement.css';
import { DataGrid } from '@mui/x-data-grid';
import { RiFolderUserFill } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import DetailUser from '../detailuser/detailuser';


function UserManagement() {
    const userId = useParams().userId;
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'displayName', headerName: 'Tên người dùng', width: 250 },
        { field: 'age', headerName: 'Tuổi', type: 'number', width: 90 },
        { field: 'sex', headerName: 'Giới tính', type: 'number', width: 90 },
        { field: 'phoneNumber', headerName: 'Số điện thoại', width: 150 },
        { field: 'address', headerName: 'Địa chỉ', width: 250 },

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

    const rows = [
        { id: 1, email: 'example1@gmail.com', displayName: 'Snow', age: 35, sex: 'Nữ', address: 'Tp HCM', phoneNumber: '0121458693' },
        { id: 2, email: 'example2@gmail.com', displayName: 'Lannister', age: 42, sex: 'Nữ', address: 'Tp Vĩnh Long', phoneNumber: '0121489693' },
        { id: 3, email: 'example3@gmail.com', displayName: 'Lannister', age: 45, sex: 'Nữ', address: 'Tp Hồ Chí Minh', phoneNumber: '0121368693' },
        { id: 4, email: 'example4@gmail.com', displayName: 'Stark', age: 16, sex: 'Nam', address: 'Vĩnh Long', phoneNumber: '0121458693' },
        { id: 5, email: 'example5@gmail.com', displayName: 'Targaryen', age: null, sex: 'Nữ', address: 'Long An', phoneNumber: '0127895693' },
        { id: 6, email: 'example6@gmail.com', displayName: 'Melisandre', age: 21, sex: 'Nữ', address: 'Tp HCM', phoneNumber: '0121458654' },
        { id: 7, email: 'example7@gmail.com', displayName: 'Clifford', age: 44, sex: 'Nữ', address: 'Vĩnh Long', phoneNumber: '0121452013' },
        { id: 8, email: 'example8@gmail.com', displayName: 'Frances', age: 36, sex: 'Nam', address: 'Tp HCM', phoneNumber: '0121458831831' },
        { id: 9, email: 'example9@gmail.com', displayName: 'Roxie', age: 65, sex: 'Nữ', address: 'Tp HCM', phoneNumber: '0121458493' },
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

export default UserManagement;