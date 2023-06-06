import './reportmanagement.css';
import { DataGrid } from '@mui/x-data-grid';
import { GoReport } from 'react-icons/go';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReports } from '../../../redux/admin/actions/adminReportAction';
import { adminSelectReports, adminSelectReportsStatus } from '../../../redux/admin/selectors/adminReportSelector';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import DetailReport from '../detailreport/detailreport';

function ReportManagement() {
    const reportId = useParams().reportId;
    const cookies = useCookies('tk')[0].tk;
    const dispatch = useDispatch();
    const reports = useSelector(adminSelectReports);
    const status = useSelector(adminSelectReportsStatus);
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
                console.log(params);
                return (
                    <div className="cellAction">
                        {
                            params.row.object_type === 1 ?
                                <Link style={{ textDecoration: "none" }} to={"/admin/reports/detail-report/" + params.id}>
                                    <div className="viewButton">Xem chi tiết</div>
                                </Link> :
                                <Link style={{ textDecoration: "none" }} to={"/admin/reports/detail-report/" + params.id}>
                                    <div className="viewButton">Xem chi tiết</div>
                                </Link>
                        }
                        <div className="optionsButton">Tùy chỉnh</div>
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        dispatch(fetchReports(cookies));
    }, [dispatch, cookies])
    console.log(reports);
    return (

        <div className='reportManagement'>
            {
                reportId ?
                    <DetailReport reportId={reportId} /> :
                    <div className='reportManagementWrapper'>
                        <div className='reportManagementBreadCrumb'>
                            <div className='reportManagementIconContainer'><GoReport size={30} className='reportManagementIcon' /></div>
                            <div className='reportManagementBreadCrumbTitle'>Báo cáo người dùng</div>
                        </div>
                        <div className='reportManagementSearchbar'>
                            <span className='reportManagementSearchDescription'>Tìm kiếm:</span>
                            <input className='reportManagementInputSearch' type="text" />
                            <button className='reportManagementButtonSearch'>Tìm</button>
                        </div>
                        <div className='reportManagementActionContainer'>
                            <div style={{ height: 650, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    status === 'loading' ?
                                        <div>
                                            Đang tải dữ liệu danh sách báo cáo từ người dùng
                                        </div> :
                                        status === 'successed' ?
                                            <DataGrid

                                                rows={reports}
                                                columns={columns.concat(actionColumn)}
                                                initialState={{
                                                    pagination: {
                                                        paginationModel: { page: 0, pageSize: 5 },
                                                    },
                                                }}
                                                pageSizeOptions={[5, 10]}
                                            /> :
                                            <div> Tải dữ liệu danh sách báo cáo từ người dùng thất bại!</div>
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default ReportManagement;