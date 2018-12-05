import React, { Component } from 'react';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';*/
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.jpg';

class navbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        //cookie.remove('ownercookie', { path: '/' })
        //localStorage.removeItem("ownerCookie")
    }
    render() {
        var fname=localStorage.getItem("ownerEmailNavbar");
        let redirectVar=null;
        require('../styles/navbar.css'); 
        return (
            
            <div>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <img src={logo} className="logoSize"/>
                        </div>
                        <ul class="nav navbar-nav">
                            <li class="active"><a href="#">Home</a></li>
                            <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                <li><a href="#">Page 1-1</a></li>
                                <li><a href="#">Page 1-2</a></li>
                                <li><a href="#">Page 1-3</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Page 2</a></li>
                            </ul>
                            <ul class="nav navbar-nav navbar-right">
                            <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
                            <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                            </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default navbar;