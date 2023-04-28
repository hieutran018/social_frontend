import './setting.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import SettingAccount from '../../components/settings/setting';

function Settings() {
    return (
        <div className='setting'>
            <div className='settingTopBar'>
                <Topbar />
            </div>
            <div className='settingContainer'>
                <Sidebar page={7} />
                <div className='settingMainContainer'>
                    <SettingAccount />
                </div>
            </div>
        </div>
    );
}

export default Settings;