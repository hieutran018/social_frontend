import './setting.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import SettingAccount from '../../components/settings/setting';
import { useParams } from 'react-router-dom';
import DetailUser from '../../components/settings/detailuser/detailuser';

function Settings() {
    const setting = useParams().setting;
    console.log("LOG PARA", setting);
    return (
        <div className='setting'>
            <div className='settingTopBar'>
                <Topbar />
            </div>
            <div className='settingContainer'>
                <Sidebar page={7} />
                <div className='settingMainContainer'>
                    {
                        !setting ? <SettingAccount /> :
                            setting === 'your_information' ? <DetailUser /> :
                                <>NOT FOUND</>
                    }

                </div>
            </div>
        </div>
    );
}

export default Settings;