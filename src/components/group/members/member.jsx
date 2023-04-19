import './member.css';
import { BsDot, BsSearch } from 'react-icons/bs';
import MemberCard from './membercard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemberGroup } from '../../../redux/actions/memberAction';
import { selectMember, selectStatusMember } from '../../../redux/selectors/memberSelector';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import SkeletonMemberCard from './skeletonMember';

function Member({ auth }) {
    const cookies = useCookies('_tk')[0]._tk;
    const groupId = useParams().groupId;
    const dispatch = useDispatch();
    const status = useSelector(selectStatusMember);
    const members = useSelector(selectMember);

    useEffect(() => {
        dispatch(fetchMemberGroup(cookies, groupId))
    }, [dispatch, groupId, cookies])

    return (
        <div className='member'>
            <div className='memberWrapper'>
                <div className='memberHeader'>
                    <div className='memberTitle'>
                        Thành viên
                    </div>
                    <div className='memberCountMember'>
                        <BsDot />{status === 'succeeded' ? members.length : 0}
                    </div>
                </div>
                <div className='memberDescriptionTitle'>
                    Thành viên và người mới tham gia nhóm sẽ hiển thị tại đây.
                </div>
                <div className='memberInputSearchMemberContainer'>
                    <BsSearch className='memberSearchIcon' />
                    <input type="text" className='memberInputSearchMember' />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <hr className='memberHr' />
                </div>
                <div className='memberList'>
                    {
                        status === 'loading' ? <SkeletonMemberCard /> :
                            status === 'succeeded' ?
                                members.map((member) => (
                                    <MemberCard key={member.id} member={member} auth={auth} />
                                )) :
                                <>FAILED</>
                    }
                </div>
            </div>
        </div>
    );
}

export default Member;