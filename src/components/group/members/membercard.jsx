import './member.css';


function MemberCard({ member }) {
    return (
        <div className='memberCard'>
            <div className='memberCardMemberAvatar'>
                <img className='memberCardAvatar' src={member.avatar} alt="" />
            </div>
            <div className='memberCardRight'>
                <div className="memberCardMemberInformation">
                    <div className='memberCardMemberName'>
                        {member.username}
                    </div>
                    {
                        member.isAdminGroup === 1 ? <div className='memberCardMemberPosition'>Quản trị viên</div> : <></>
                    }
                </div>
                <div className='memberCardJoinedAt'>
                    Đã tham gia vào thứ ba
                </div>
            </div>
        </div>
    );
}

export default MemberCard;