import React from 'react';
import logo from '../assets/img/logo.png';
import '../assets/css/header.css';
export default function Header() {

    return (
        <>
            <nav className="navbar navbar-light bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-nav" href="#">
                        <img src={logo} alt="" width="70" height="55" className="d-inline-block align-text-top"/>
                            Arkanoid
                    </a>
                </div>
            </nav>
        </>
    );
}