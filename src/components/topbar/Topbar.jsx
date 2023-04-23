import { Chat, Notifications } from '@mui/icons-material';
import { BsSearch } from 'react-icons/bs';
import { GrLinkNext } from 'react-icons/gr';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NavItem from '../navitem/navitem';
import DropdownMenu from '../dropdownmenu/dropdownmenu';
import './topbar.css';
import { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Topbar() {
    const cookies = useCookies('_tk')[0]._tk;
    const [inputSearch, setInputSearch] = useState('');
    const [dataUsers, setDataUsers] = useState([]);
    const [searchTemp, setSearchTemp] = useState('');
    const typingTimeOutRef = useRef(null);



    const handleChangeSearch = (event) => {
        setSearchTemp(event.target.value);
        if (!event.target.value) {
            setDataUsers([])
        } else {
            setInputSearch(event.target.value);
            //? ĐẶT LẠI THỜI GIAN ĐỢI CHO VIỆC GÕ
            if (typingTimeOutRef.current) {
                clearTimeout(typingTimeOutRef.current);
            }
            typingTimeOutRef.current = setTimeout(() => {
                searchData(event.target.value);

            }, 300)
        }

    }
    function searchData(input) {
        const requestURL = 'http://127.0.0.1:8000/api/v1/search-users-and-groups/' + input;

        axios({
            method: "GET",
            url: requestURL,
            headers: {
                Authorization: "Bearer " + cookies,
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
            }
        }).then((response) => {
            setDataUsers(response.data.users);
            console.log(response.data.users);
        }).catch((error) => console.log(error));
    }
    const handleCloseData = () => {
        setDataUsers([]);
    }


    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <a href='/' className="sidebarLogo">
                    {<span className="logo">CKCS</span>}
                </a>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">

                    <BsSearch size={25} className="searchIcon" />
                    <input
                        value={searchTemp}
                        onChange={handleChangeSearch}
                        placeholder="Tìm kiếm bạn bè..."
                        className="searchInput"
                    />
                    {
                        dataUsers.length === 0 ?
                            <></> :
                            <div className='dataResult'>
                                <div className='dataResultContainer'>
                                    {
                                        dataUsers.map((item) => (
                                            <div key={item.id} className='dataCard'>
                                                <div className='dataCardLeft'>
                                                    <img className='dataAvatar' src={item.avatar} alt="" />
                                                </div>
                                                <div className='dataCardRight'>
                                                    <div className='dataName'>{item.displayName}</div>
                                                    <Link onClick={handleCloseData} to={'/' + item.id}>
                                                        <div className='dataButtonNextSearch'>
                                                            <GrLinkNext size={25} />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <Link className='dataCardLink' onClick={handleCloseData} style={{ textDecoration: "none" }} to={"/search/" + inputSearch}>
                                        <div className='dataCardSearchFor'>
                                            <div className='dataIconSearchFor'>
                                                <BsSearch size={25} className="searchIcon" />
                                            </div>

                                            <div className='dataCardRight'>
                                                <div className='dataNameSearchFor'>Tìm kiếm kết quả cho "{inputSearch}"</div>

                                            </div>


                                        </div>
                                    </Link>
                                </div>
                            </div>
                    }
                </div>


            </div>

            <div className="topbarRight">

                <div className="topbarIcons">

                    <div className="topbarIconItem">
                        <Chat fontSize='25' />
                        {/* <span className="topbarIconBadge">2</span> */}
                    </div>
                    <div className="topbarIconItem">
                        <Notifications fontSize='25' />
                        {/* <span className="topbarIconBadge">1</span> */}
                    </div>
                </div>

                <NavItem icon={<ArrowDropDownIcon />}>
                    <DropdownMenu />
                </NavItem>
            </div>
        </div>
    );
}

export default Topbar;