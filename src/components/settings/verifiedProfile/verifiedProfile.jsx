import { useCookies } from 'react-cookie';
import './verifiedProfile.css';
import { useState } from 'react';
import axios from 'axios';

function VerifiedProfile() {
    const cookies = useCookies('_tk')[0]._tk;
    const [name, setName] = useState('');
    const [documentType, setDocumentType] = useState();
    const [file1, setFile1] = useState([]);
    const [file2, setFile2] = useState([]);
    const [outstandingType, setOutstandingType] = useState();
    const [country, setCountry] = useState('');
    const [quoteOne, setQuoteOne] = useState('');
    const [quoteTwo, setQuoteTwo] = useState('');
    const [quoteThree, setQuoteThree] = useState('');
    const [quoteFour, setQuoteFour] = useState('');
    const [quoteFive, setQuoteFive] = useState('');

    const hanndleChaneName = (e) => {
        setName(e.target.value);
    }
    const hanbdleCountry = (e) => {
        setCountry(e.target.value);
    }
    const handleChangeDocumentType = (e) => {
        setDocumentType(e.target.value);
    }
    const handleChangeOutstandingType = (e) => {
        setOutstandingType(e.target.value);
    }
    const hanbdleQuoteOne = (e) => {
        setQuoteOne(e.target.value);
    }
    const hanbdleQuoteTwo = (e) => {
        setQuoteTwo(e.target.value);
    }
    const hanbdleQuoteThree = (e) => {
        setQuoteThree(e.target.value);
    }
    const hanbdleQuoteFour = (e) => {
        setQuoteFour(e.target.value);
    }
    const hanbdleQuoteFive = (e) => {
        setQuoteFive(e.target.value);
    }
    const handleChangeFile1 = (e) => {
        setFile1(e.target.files);
    }
    const handleChangeFile2 = (e) => {
        setFile2(e.target.files);
    }

    const handleSubmitVerifiedProfile = () => {
        const requestURL = 'http://127.0.0.1:8000/api/v1/verified-profile';
        axios({
            method: 'POST',
            url: requestURL,
            data: {
                name: name,
                documentType: documentType,
                file1: file1,
                file2: file2,
                country: country,
                outstandingType: outstandingType,
                quoteOne: quoteOne,
                quoteTwo: quoteTwo,
                quoteThree: quoteThree,
                quoteFour: quoteFour,
                quoteFive: quoteFive
            },
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className='verifiedProfile'>
            <div className="verifiedProfileWrapper">
                <div className='verifiedProfileTitle'>
                    Xác minh tài khoản của bạn trên CKCSocial
                </div>
                <div className='verifiedProfileDescriptionPage'>
                    Đã xác minh rằng hồ sơ có dấu kiểm màu xanh lam bên cạnh tên của họ để cho thấy rằng
                    CKCSocial đã xác nhận rằng họ là sự hiện diện thực sự của nhân vật công chúng,
                    người nổi tiếng và thương hiệu mà họ đại diện.
                </div>
                <div>
                    <hr className='verifiedProfileHr' />
                </div>
                <div className='verifiedProfileMain'>
                    <div className='verifiedProfileStep'>Bước 1: Xác minh danh tính</div>
                    <div className='verifiedProfileInput'>
                        <div className='verifiedProfileLabel'>Họ và tên</div>
                        <input value={name} onChange={hanndleChaneName} className='verifiedProfileInputContent' type="text" />
                    </div>
                    <div className='verifiedProfileInput'>
                        <div className='verifiedProfileLabel'>Loại giấy tờ</div>
                        <select onChange={handleChangeDocumentType} className='verifiedProfileInputContentselect'>
                            <option value="PSR">Hộ chiếu</option>
                            <option value="NIC">CCCD/CMND</option>
                            <option value="DRL">Giấy phép lái xe</option>
                            <option value="TFG">Tờ khai thuế</option>
                        </select>
                    </div>
                    <div className='verifiedProfileInputAddFile'>
                        <div className='verifiedProfileLabelAddFile'>Thêm hình ảnh xác thực</div>
                        <div className='verifiedProfileLabelAddFileDescription'>Gồm mặt trước và mặt sau với lựa chọn liên quan ở trên.</div>
                        <input onChange={handleChangeFile1} className='verifiedProfileInputContentAddFile' type="file" />
                        <input onChange={handleChangeFile2} className='verifiedProfileInputContentAddFile' type="file" />
                    </div>
                    <div className='verifiedProfileStep'>Bước 2: Xác nhận độ nổi bật</div>
                    <div className='verifiedProfileInput'>
                        <div className='verifiedProfileLabel'>Loại hình nổi bật</div>
                        <select onChange={handleChangeOutstandingType} className='verifiedProfileInputContentselect'>
                            <option value="Streamer">Streamer</option>
                            <option value="Gamer">Gamer</option>
                            <option value="Singer">Ca sĩ</option>
                            <option value="Performer">Diễn viên</option>
                            <option value="DBC">Người sáng tạo kỹ thuật số/Blogger/Người có tầm ảnh hưởng</option>
                            <option value="Orther">Khác___________</option>
                        </select>
                    </div>
                    <div className='verifiedProfileInput'>
                        <div className='verifiedProfileLabel'>Quốc gia</div>
                        <input onChange={hanbdleCountry} value={country} className='verifiedProfileInputContent' type="text" />
                    </div>
                    <div className='verifiedProfileLabelAddFileDescription'>
                        Thêm tối đa năm bài viết, tài khoản mạng xã hội và các liên kết khác cho thấy trang cá nhân của bạn là vì lợi ích công cộng.
                        Nội dung trả phí hoặc quảng cáo sẽ không được xem xét. (Không bắt buộc)
                    </div>
                    <div className='verifiedProfileInput'>
                        <div className='verifiedProfileLabel'>Trích dẫn 1</div>
                        <input onChange={hanbdleQuoteOne} value={quoteOne} className='verifiedProfileInputContent' type="text" />
                    </div>
                    <div className='verifiedProfileInput'>
                        <div className='verifiedProfileLabel'>Trích dẫn 2</div>
                        <input onChange={hanbdleQuoteTwo} value={quoteTwo} className='verifiedProfileInputContent' type="text" />
                    </div>
                    <div className='verifiedProfileInput'>
                        <div className='verifiedProfileLabel'>Trích dẫn 3</div>
                        <input onChange={hanbdleQuoteThree} value={quoteThree} className='verifiedProfileInputContent' type="text" />
                    </div>
                    <div className='verifiedProfileInput'>
                        <div className='verifiedProfileLabel'>Trích dẫn 4</div>
                        <input onChange={hanbdleQuoteFour} value={quoteFour} className='verifiedProfileInputContent' type="text" />
                    </div>
                    <div className='verifiedProfileInput'>
                        <div className='verifiedProfileLabel'>Trích dẫn 5</div>
                        <input onChange={hanbdleQuoteFive} value={quoteFive} className='verifiedProfileInputContent' type="text" />
                    </div>
                    <div className='verifiedProfileButton'>
                        <button onClick={handleSubmitVerifiedProfile} className='verifiedProfileButtonSubmit'>Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifiedProfile;