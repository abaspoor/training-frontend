import React from 'react';
import logo from '../assets/R.png'

function Header(){
    return(
        <div className="header">
            <img className="header-img" src={logo} alt="BWF logo" height="150"/>
        </div>
    );
}

export default Header;