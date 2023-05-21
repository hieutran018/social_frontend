import './reportmanagement.css';
import { DataGrid } from '@mui/x-data-grid';
import { GoReport } from 'react-icons/go';
import { Link } from 'react-router-dom';



function ReportManagement() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'owner', headerName: 'Người gửi', width: 250 },
        { field: 'violators', headerName: 'Người vi phạm', width: 250 },
        { field: 'typeReport', headerName: 'Loại vi phạm', width: 250 },
        { field: 'objectType', headerName: 'Đối tượng', type: 'number', width: 140 },
        { field: 'objectId', headerName: 'Mã đối tượng', width: 110 },
        { field: 'status', headerName: 'tình trạng', width: 120 },

    ];
    const actionColumn = [
        {
            field: "action",
            headerName: "Hành động",
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link style={{ textDecoration: "none" }} to={"/admin/reports/detail-report/" + params.id}><div className="viewButton">Xem chi tiết</div></Link>
                        <div className="optionsButton">Tùy chỉnh</div>
                    </div>
                );
            },
        },
    ];

    const rows = [
        { id: 1, violators: 'Stark', owner: 'Melisandre', typeReport: 'Hình ảnh gây bao lực', objectType: 'Bài viết', objectId: 1, status: 'Đã kiểm tra' },
        { id: 2, violators: 'Targaryen', owner: 'Lannister', typeReport: 'Hình ảnh gây bao lực', objectType: 'Bài viết', objectId: 2, status: 'Đã kiểm tra' },
        { id: 3, violators: 'Targaryen', owner: 'Clifford', typeReport: 'Hình ảnh gây bao lực', objectType: 'Bản tin', objectId: 12, status: 'Đã kiểm tra' },
        { id: 4, violators: 'Targaryen', owner: 'Stark', typeReport: 'Hình ảnh gây bao lực', objectType: 'Bình luận', objectId: 15, status: 'Đã kiểm tra' },
        { id: 5, violators: 'Clifford', owner: 'Targaryen', typeReport: 'Hình ảnh gây bao lực', objectType: 'Bài viết', objectId: 3, status: 'Đã kiểm tra' },
        { id: 6, violators: 'Clifford', owner: 'Melisandre', typeReport: 'Hình ảnh gây bao lực', objectType: 'Bài viết', objectId: 5, status: 'Đã kiểm tra' },
        { id: 7, violators: 'Frances', owner: 'Clifford', typeReport: 'Hình ảnh gây bao lực', objectType: 'Bình luận', objectId: 6, status: 'Đã kiểm tra' },
        { id: 8, violators: 'Melisandre', owner: 'Frances', typeReport: 'Hình ảnh gây bao lực', objectType: 'Bản tin', objectId: 6, status: 'Đã kiểm tra' },
        { id: 9, violators: 'Frances', owner: 'Roxie', typeReport: 'Hình ảnh gây bao lực', objectType: 'Bản tin', objectId: 10, status: 'Đã kiểm tra' },
    ];

    return (

        <div className='reportManagement'>
            <div className='reportManagementWrapper'>
                <div className='reportManagementBreadCrumb'>
                    <div className='reportManagementIconContainer'><GoReport size={30} className='reportManagementIcon' /></div>
                    <div className='reportManagementBreadCrumbTitle'>Phản hồi người dùng</div>
                </div>
                <div className='reportManagementSearchbar'>
                    <span className='reportManagementSearchDescription'>Tìm kiếm:</span>
                    <input className='reportManagementInputSearch' type="text" />
                    <button className='reportManagementButtonSearch'>Tìm</button>
                </div>
                <div className='reportManagementActionContainer'>
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

export default ReportManagement;