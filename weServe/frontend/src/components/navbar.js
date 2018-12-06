import React, { Component } from 'react';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';*/
import { Link } from 'react-router-dom';

import { Redirect } from 'react-router';

import logo from '../assets/images/logo.jpg';

class navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handelOpportunity: "",
            nextPage: false,
            nextPage1: false,
            redirect: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.nextPage1 = this.nextPage1.bind(this);
        this.logout = this.logout.bind(this)

    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        //cookie.remove('ownercookie', { path: '/' })
        //localStorage.removeItem("ownerCookie")
    }
    nextPage = () => {
        this.setState({
            nextPage: true
        })
    }
    nextPage1 = () => {
        this.setState({
            nextPage1: true
        })
        console.log(this.state.nextPage1);
    }

    logout() {
        localStorage.clear();
        this.setState({
            redirect: true
        })
    }
    render() {
        var fname = localStorage.getItem("ownerEmailNavbar");
        let redirectVar = null;
        if (this.state.nextPage) {
            redirectVar = <Redirect to="/beaVolunteer" />
        }
        if (this.state.nextPage1) {
            redirectVar = <Redirect to="/findaVolunteer" />
        }
        require('../styles/navbar.css');

        let beAVolunteerModal = null;
        beAVolunteerModal = (
            <div></div>
        )

        let findAVolunteerModal = null;
        findAVolunteerModal = (
            <div></div>
        )

        let newCom;
        if (!localStorage.getItem('myData')) {
            newCom = <li className="dropdown headings  ">
                <a href="" data-toggle="dropdown" className="dropdown-toggle navButton btn btn-info" role="button" id='noFocus'  >
                    Login </a>
                <ul className="dropdown-menu " style={{ left: "-58px" }}>

                    <li style={{ padding: "10px", textAlign: "center" }}>
                        <a style={{ color: "#7fc241" }} href="/login" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right' >Volunteer</a>
                    </li>
                    <li style={{ padding: "10px", textAlign: "center" }}>
                        <a style={{ color: "#7fc241" }} href="/loginNGO" className='Dropdown__menu Dropdown__menu--open Dropdown__menu--right' >NGO</a>
                    </li>
                </ul>
            </li>
        } else {
            newCom = <li className="dropdown headings  ">
                <a href="/" onClick={this.logout} data-toggle="dropdown" className="navButton btn btn-info" role="button" id='noFocus'  >
                    Logout </a>

            </li>

        }
        // let redirectVar;
        if (this.state.redirect) {
            redirectVar = <Redirect to="/" />

        }

        return (

            <div>
                {redirectVar}
                <nav className="navbar navbar-expand-sm">
                    <div className="container-fluid" style={{ marginTop: "0px" }}>
                        <div className="navbar-header">
                            <Link to='/'>   <img src={logo} className="logoSize" /></Link>
                        </div>

                        <ul className="nav navbar-nav navbar-right">

                            <li className="dropdown headings ">
                                <a className="navHeader" href="/beaVolunteer" id='noFocus'  >

                                    Be a volunteer </a>

                                {/* <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    {beAVolunteerModal}
                                </div> */}

                            </li>
                            <li className="dropdown headings ">
                                <a className="navHeader" href="/findaVolunteer" id='noFocus'  >

                                    Find a volunteer </a>
                                {/* <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    {findAVolunteerModal}
                                </div> */}
                            </li>
                            {newCom}


                        </ul>
                    </div>
                </nav>


                <div id="findA" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">

                            <div class="modal-body">
                                <label for="sel1"><h6>Tell us what you care for:</h6></label>

                                <select onChange={this.handleOpportunity} class="form-control myWidth" id="sel1">
                                    <option value="" >Select...</option>
                                    <option value="Children and Youth" selected={this.state.handelOpportunity == "Children and Youth"}>Children and Youth</option>
                                    <option value="Education" selected={this.state.handelOpportunity == "Education"}>Education</option>
                                    <option value="Women Empowerment " selected={this.state.handelOpportunity == "Women Empowerment "}>Women Empowerment </option>
                                    <option value="Animals" selected={this.state.handelOpportunity == "Animals"}>Animals</option>
                                    <option value="Community Development" selected={this.state.handelOpportunity == "Community Development"}>Community Development</option>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <a href="/findaVolunteer" className="btn btn-default">Okay</a>
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="beA" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">

                            <div class="modal-body">
                                <label for="sel1"><h6>Tell us what you care for:</h6></label>

                                <select onChange={this.handleOpportunity} class="form-control myWidth" id="sel1">
                                    <option value="" >Select...</option>
                                    <option value="Children and Youth" selected={this.state.handelOpportunity == "Children and Youth"}>Children and Youth</option>
                                    <option value="Education" selected={this.state.handelOpportunity == "Education"}>Education</option>
                                    <option value="Women Empowerment " selected={this.state.handelOpportunity == "Women Empowerment "}>Women Empowerment </option>
                                    <option value="Animals" selected={this.state.handelOpportunity == "Animals"}>Animals</option>
                                    <option value="Community Development" selected={this.state.handelOpportunity == "Community Development"}>Community Development</option>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <a href="/beaVolunteer" className="btn btn-default">Okay</a>

                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>






            </div>
        )
    }
}

export default navbar;