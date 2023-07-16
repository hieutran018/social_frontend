import { useCookies } from 'react-cookie';
import DetailPost from '../detailpost/detailpost';
import './detailreport.css';
import { GoReport } from 'react-icons/go';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function DetailReport() {
    const navigate = useNavigate();
    const reportId = useParams().reportId;
    const cookies = useCookies('tk')[0].tk;
    const [report, setReport] = useState();
    useEffect(() => {
        const requestURL = "https://ckcsocial.site/api/v1/admin/fetch-report-by-id/reportId=" + reportId;
        axios({
            method: "GET",
            url: requestURL,
            headers: {
                Authorization: "Bearer " + cookies
            }
        }).then((response) => {
            setReport(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [cookies, reportId])

    const handleCheckReport = (change) => {
        const requestURL = "https://ckcsocial.site/api/v1/admin/check-report";
        axios({
            method: "POST",
            url: requestURL,
            headers: {
                Authorization: "Bearer " + cookies
            },
            data: {
                change: change,
                reportId: reportId
            }
        }).then((response) => {
            console.log(response.data);
            navigate('/admin/reports')
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className='reportManagementWrapper'>
            <div className='reportManagementBreadCrumb'>
                <div className='reportManagementIconContainer'><GoReport size={30} className='postsManagementIcon' /></div>
                <div className='reportManagementBreadCrumbTitle'>Báo cáo người dùng / <span className='postsManagementBreadCrumbTitleCurrent'>Chi tiết báo cáo người dùng</span></div>
            </div>
            {
                report ?
                    <div>
                        <div className='reportDetailMain'>
                            <div className='reportDetailContentDescription'>
                                Người gửi báo cáo: <div className='reportDetailContentReport'>{report.owner}</div>
                            </div>
                            <div className='reportDetailContentDescription'>
                                Đối tượng báo cáo: <div className='reportDetailContentReport'>{report.objectType}</div>
                            </div>
                            <div className='reportDetailContentDescription'>
                                Mã đối tượng: <div className='reportDetailContentReport'>{report.objectId}</div>
                            </div>
                            <div className='reportDetailContentDescription'>
                                Người vi phạm: <div className='reportDetailContentReport'>{report.violators}</div>
                            </div>
                            <div className='reportDetailContentDescription'>
                                Loại vi phạm: <div className='reportDetailContentReport'>{report.typeReport}</div>
                            </div>
                            <div className='reportDetailContentDescription'>
                                Trạng thái: <div className='reportDetailContentReport'>{report.status}</div>
                            </div>
                        </div>
                        <DetailPost props={report.objectId} />
                        <div className='reportAction'>
                            <button onClick={() => navigate(-1)} className='reportButtonCancel'>Quay lại</button>
                            <div>
                                <button onClick={() => handleCheckReport(1)} className='reportButtonDeletePost'>Xóa bài viết</button>
                                <button onClick={() => handleCheckReport(0)} className='reportButtonChecked'>Không có vấn đề gì</button>
                            </div>
                        </div>
                    </div>
                    : <></>
            }

        </div>
    )
}

export default DetailReport;