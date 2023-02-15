import React from 'react';
import Logo from '../../assets/logo.png';



function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="container-fluid d-flex justify-content-center align-items-center ">
                <img src={Logo} alt="Logo" className="logo"/>
            </div>
        </nav>
    )
}

export default Navbar;