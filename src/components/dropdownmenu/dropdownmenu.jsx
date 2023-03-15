import React, { useState } from "react";
import DropdownItem from "../dropdownitem/dropdownitem";
import SettingsIcon from '@mui/icons-material/Settings';
import { CSSTransition } from "react-transition-group";
import "./dropdownmenu.css";

const DropdownMenu = () => {
    // state for csstransition
    const [active, setActive] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);

    {
        /*we use this function as a callback in CSSTransition onEnter prop which runs this callback when it is 
    mounted to DOM
    */
    }
    function calcHeight(el) {
        // el.offsetHeight is height in pixels of that component. we use this in dropdown menu style height to set height
        const height = el.offsetHeight;
        console.log(height);
        setMenuHeight(height);
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
                    <DropdownItem><span className="textFunction">My Profile</span></DropdownItem>
                    {/* if this item is clicked then only CSSTransition component will be triggered if active === settings as given in in prop boolean */}
                    <DropdownItem
                        leftIcon={<SettingsIcon />}
                        goToMenu={"settings"}
                        setActive={setActive}
                    >
                        <span className="textFunction">Setting</span>
                    </DropdownItem>
                    <DropdownItem leftIcon="🦧" goToMenu="animals" setActive={setActive}>
                        <span className="textFunction">Animal</span>
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
                        leftIcon={<SettingsIcon />}
                        goToMenu={"main"}
                        setActive={setActive}
                    >
                        <h2 className="textFunction">Setting</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon={<SettingsIcon />}><span className="textFunction">HTML</span></DropdownItem>
                    <DropdownItem className="textFunction" leftIcon={<SettingsIcon />}><span className="textFunction">CSS</span></DropdownItem>
                    <DropdownItem className="textFunction" leftIcon={<SettingsIcon />}>
                        <span className="textFunction">JS</span>
                    </DropdownItem>
                    <DropdownItem className="textFunction" leftIcon={<SettingsIcon />}>
                        <span className="textFunction">PHP</span>
                    </DropdownItem>
                </div>
            </CSSTransition >
            <CSSTransition
                in={active === "animals"}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem
                        goToMenu="main"
                        leftIcon={<SettingsIcon />}
                        setActive={setActive}
                    >
                        <h2 className="textFunction">Animals</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon="🦘"><span className="textFunction">Kangaroo</span></DropdownItem>
                    <DropdownItem leftIcon="🐸"><span className="textFunction">Frog</span></DropdownItem>
                    <DropdownItem leftIcon="🦋"><span className="textFunction">Horse? </span></DropdownItem>
                    <DropdownItem leftIcon="🦔"><span className="textFunction">Hedgehog</span></DropdownItem>
                </div>
            </CSSTransition>
        </div >
    );
};

export default DropdownMenu;