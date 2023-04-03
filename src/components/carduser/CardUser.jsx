import './carduser.css'

function CardUser({ user }) {

    return (
        <div className='cardUser'>
            <img className="cardUserProfileImg" src={user.avatar} alt="" />
            <h1 className='textName'>{user.username}</h1>

            <div className='accept'>
                <button className='buttonAccept'>Xác nhận</button>
            </div>
            <div className='cancel'>
                <button className='buttonCancel'>Xóa</button>
            </div>

        </div>
    );
}

export default CardUser;