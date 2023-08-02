import { useState } from "react";

function MenuButton(props){

    const className = open ? 'menu-btn open' : 'menu-btn';

    return (
        <div className={className} onClick={() => props.setMenuOpen(!props.menuOpen)}>
            <div className="btn-line"></div>
            <div className="btn-line"></div>
            <div className="btn-line"></div>
        </div>
    );
}

export default MenuButton;