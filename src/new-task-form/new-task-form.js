import React from "react";

import './header.css';

const Header = () => {
    return (
        <div className="header">
            <h1>Todos</h1>
            <input type="text"
                   className="new-todo"
                   autoFocus
                   placeholder="What needs to be done?"/>
        </div>
    );
};
export default Header;