import './reports.css';
import { GrNext, GrLinkPrevious } from 'react-icons/gr';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from '../auth/auth';

function Reports({ postId, close }) {
    const cookies = useCookies('_tk')[0]._tk;
    const [reported, setReported] = useState();
    const noti = (text) => {
        toast.info(text, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const reports = [
        {
            id: 0,
            content: 'Bạo lực',
            description: [
                'Đe dọa bạo lực',
                'Người hoặc tổ chức nguy hiểm',
                'Hình ảnh bạo lực phản cảm cực đoan',
                'Một loại bạo lực khác'
            ]
        },
        {
            id: 1,
            content: 'Thư rác',
            description: [
                'Mua, bán hoặc tặng tài khoản, vai trò hoặc quyền',
                'Khuyến khích mọi người tương tác với nội dung giả vờ sai sự thật',
                'Hướng mọi người ra khỏi CKCSocial thông qua việc sử dụng liên kết gây hiểu lầm',
            ]
        },
        {
            id: 2,
            content: 'Quấy rối',
            description: []
        },
        {
            id: 3,
            content: 'Bán hàng trái phép',
            description: [
                'Vũ khí',
                'Chất cấm',
                'Buôn người',
                'Một cái gì đó khác'
            ]
        },
        {
            id: 4,
            content: 'Lời nói căm thù',
            description: [
                'Chủng tộc, sắc tộc',
                'Nguồn gốc quốc gia',
                'Liên kết tôn giáo',
                'Xu hướng tình dục',
                'Giới tính hoặc bán dạng giới',
                'Khuyết tật hoặc bệnh tật',
                'Một cái gì đó khác'
            ]
        },
        {
            id: 5,
            content: 'Khủng bố',
            description: []
        },
        {
            id: 6,
            content: 'Thông tin sai lệch',
            description: [
                'Chính trị',
                'Vấn đề xã hội',
                'Sức khỏe',
                'Một cái gì đó khác'
            ]
        },
        {
            id: 7,
            content: 'Tự tử hoặc gây thương tích',
            description: [
                'Yêu cầu chúng tôi xem về vấn đề này.'
            ]
        },
    ];

    const handleChangeReport = (report) => {
        setReported(report);
    }
    const handlePreviousTabReport = () => {
        setReported(null);
    }

    const handleSubmitReport = () => {
        // const requestURL = "https://ckcsocial.site/api/v1/create-report";
        baseURL.post('/api/v1/create-report', {
            objectType: 1,
            objectId: postId,
            contentReport: reported.content
        }, {
            headers: {
                Authorization: 'Bearer ' + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((res) => {
            console.log(res.data);
            close()
            noti('Chúng tôi sẽ tiến hành kiểm tra báo cáo của bạn.')
        }).catch((error) => console.log(error))
    }

    return (
        reported ?
            <div className='reports'>
                <div style={{ marginBottom: '1rem' }} className='reporsWrapper'>
                    <div onClick={handlePreviousTabReport} className='reportsBack'><GrLinkPrevious size={25} /></div>
                    <div style={{ marginBottom: "1rem" }}>
                        <div className='reportsTitle'>{reported.content}</div>
                        <div style={{ fontSize: "18px" }}>Chúng tôi không cho phép những nội dung như:</div>
                    </div>
                    <div>
                        {
                            reported.description.map((item) => (
                                <li style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                                    {item}
                                </li>
                            ))
                        }
                    </div>
                    <button onClick={handleSubmitReport} className='reportsButtonSubmit'>Xác nhận</button>
                </div>
            </div> :
            <div className='reports'>
                <div className='reporsWrapper'>
                    <div style={{ marginBottom: "1rem" }}>
                        <div className='reportsTitle'>Vui lòng chọn một vấn đề</div>
                        <div style={{ fontSize: "18px" }}>Nếu ai đó đang gặp nguy hiểm cận kề, hãy yêu cầu trợ giúp trước khi báo cáo với CKCSocial. Đừng chờ đợi.</div>
                    </div>
                    {
                        reports.map((report) => (
                            <div onClick={() => handleChangeReport(report)} key={report.id} className='reportsItem'>
                                <div className='reportsItemDescription'>{report.content}</div>
                                <GrNext size={25} />
                            </div>
                        ))
                    }
                </div>
                <hr style={{ marginBottom: '1rem' }} />
            </div>
    );
}

export default Reports;