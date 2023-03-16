import React from "react";
import "./dropdownitem.css";

const DropdownItem = (props) => {
    return (
        <>
            <span
                className="menu-item"
                onClick={() => props.goToMenu && props.setActive(props.goToMenu)}
            >
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
            </span>
        </>
    );
};

export default DropdownItem;