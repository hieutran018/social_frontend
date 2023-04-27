import React, { useState } from "react";
import DropdownItem from "../dropdownitem/dropdownitem";
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CSSTransition } from "react-transition-group";
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios";
import "./dropdownmenu.css";

const DropdownMenu = () => {
    // state for csstransition
    const [active, setActive] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const [cookies, remove] = useCookies(["_tk"]);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    function calcHeight(el) {
        // el.offsetHeight is height in pixels of that component. we use this in dropdown menu style height to set height
        const height = el.offsetHeight;
        console.log(height);
        setMenuHeight(height);
    }

    const handleLogOut = () => {
        console.log(1);
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/auth/logout',
            headers: {
                Authorization: 'Bearer ' + cookies._tk
            }
        }).then(() => { remove('_tk'); localStorage.removeItem('user'); navigate('/login') }).catch((err) => { console.log(err.message); });
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }}>
            {/* 
There are two dropdown containers for csstransitions component main and secondary.
we always go back to main conyainer and we use secondary as name for more container because we can style easy    
    */}
            <CSSTransition
                // if in is true then this CSSTransition component renders
                in={active === "main"}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
                onEnter={calcHeight}
            >
                {/* CSSTransition component check for next element and adds transitions to that element by adding classNames we specified 
        in this component props to next element and we add css to animate
        */}
                <div className="menu">
                    <Link to={"/" + user.id} className="dropDownItemProfile">
                        <DropdownItem leftIcon={<AccountCircleIcon />}>
                            <span className="textFunction">{user.displayName}</span>
                        </DropdownItem>
                    </Link>
                    {/* if this item is clicked then only CSSTransition component will be triggered if active === settings as given in in prop boolean */}
                    <DropdownItem
                        leftIcon={<SettingsIcon />}
                        goToMenu={"settings"}
                        setActive={setActive}
                    >
                        <span className="textFunction">Cài đặt chung</span>
                    </DropdownItem>
                    <DropdownItem leftIcon={<LogoutIcon />}>
                        <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }} onClick={handleLogOut}>
                            <span className="textFunction">Đăng xuất</span>
                        </div>

                    </DropdownItem>
                </div>
            </CSSTransition>
            <CSSTransition
                in={active === "settings"}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem
                        leftIcon={<ArrowBackIcon />}
                        goToMenu={"main"}
                        setActive={setActive}
                    >
                        <h2 className="textFunction">Cài đặt chung</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon={<SettingsIcon />}><span className="textFunction">Thông tin cá nhân</span></DropdownItem>
                    <DropdownItem className="textFunction" leftIcon={<SettingsIcon />}><span className="textFunction">Đổi mật khẩu</span></DropdownItem>

                </div>
            </CSSTransition >

        </div >
    );
};

export default DropdownMenu;