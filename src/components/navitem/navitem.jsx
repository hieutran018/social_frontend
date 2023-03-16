import React, { useState } from "react";
import "./navitem.css";

const NavItem = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item">
            <span className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </span>
            {open && props.children}
        </li>
    );
};

export default NavItem;