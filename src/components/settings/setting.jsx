import './setting.css';
import { Link } from 'react-router-dom';

function SettingAccount() {
    return (
        <div className='settingAccount'>
            <div className='settingAccountWrapper'>
                <div className='settingAccountTitle'>
                    Thông tin của bạn trên CKCSocial
                </div>
                <div className='settingAccountDownloadContent'>
                    Bạn có thể xem hoặc tải xuống thông tin của mình và xóa tài khoản bất cứ lúc nào.
                </div>
                <div>
                    <hr className='settingAccountHr' />
                </div>
                <div className='settingAccountMainContainer'>
                    <div className='settingAccountOption'>
                        <div className='settingAccountTitleOption'>Truy cập thông tin của bạn</div>
                        <div className='settingAccountDescriptionOption'>Xem, cập nhật thông tin của bạn.</div>
                        <a className='settingAccountLinkOption' href="/settings/your_information">Đi đến</a>
                    </div>
                    <hr />
                    <div className='settingAccountOption'>
                        <div className='settingAccountTitleOption'>Tải xuống thông tin của bạn</div>
                        <div className='settingAccountDescriptionOption'>Sao chép ảnh, video, bài viết hoặc thông tin khác sang dịch vụ khác.</div>
                        <a className='settingAccountLinkOption' href="*">Đi đến</a>
                    </div>
                    <hr />
                    <div className='settingAccountOption'>
                        <div className='settingAccountTitleOption'>Cập nhật mật khẩu</div>
                        <div className='settingAccountDescriptionOption'>Đổi mật khẩu tài khoản của bạn.</div>
                        <a className='settingAccountLinkOption' href="*">Đi đến</a>
                    </div>
                </div>
                <div>
                    <hr className='settingAccountHrEnd' />
                </div>
            </div>
        </div>
    );
}
export default SettingAccount;