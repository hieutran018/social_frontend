import { useParams } from 'react-router-dom';
import DetailUser from '../../components/settings/detailuser/detailuser';
import SettingAccount from '../../components/settings/setting';
import './settingPage.css';
import VerifiedProfile from '../../components/settings/verifiedProfile/verifiedProfile';

function SettingPage() {
    const setting = useParams().setting;
    return (
        <div className='settingPage'>
            {
                !setting ? <SettingAccount /> :
                    setting === 'your_information' ? <DetailUser /> :
                        setting === 'verified_profile' ? <VerifiedProfile /> :
                            <>NOT FOUND</>
            }

        </div>
    );
}

export default SettingPage;