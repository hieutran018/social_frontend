import './members.css';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { baseURL } from '../../../components/auth/auth';
import { Link } from 'react-router-dom';

function MemberChat({ conversation }) {
    const cookies = useCookies('_tk')[0]._tk;
    const [members, setMembers] = useState([]);

    useEffect(() => {
        baseURL.get('/api/v1/fetch-paticiants/conversationId=' + conversation, {
            headers: {
                Authorization: 'Bearer ' + cookies,
            }
        }).then((response) => {
            setMembers(response.data);
            console.log("MEMBER CHAT", response.data);
        })
    }, [conversation, cookies])

    return (
        <div className='membersChat'>
            {
                members.map((member) => (
                    <Link to={"/userId/" + member.userId} key={member.id} className='memberChatCard'>
                        <img className='memberCardChatAvatar' src={member.avatar} alt="" />
                        <div>{member.displayName}</div>
                    </Link>
                ))
            }
        </div>
    );
}
export default MemberChat;