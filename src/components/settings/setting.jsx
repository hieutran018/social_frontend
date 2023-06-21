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
                    Bạn có thể xem hoặc xác minh thông tin của mình và xóa tài khoản bất cứ lúc nào.
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
                        <div className='settingAccountTitleOption'>Xác minh tài khoản của bạn</div>
                        <div className='settingAccountDescriptionOption'>Dành cho các tài khoản cá nhân chính chủ, có sức ảnh hưởng đến cộng đồng.</div>
                        <a className='settingAccountLinkOption' href="/settings/verified_profile">Đi đến</a>
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