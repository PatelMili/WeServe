import React, { Component } from 'react';

//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/

import Navbar from '../components/navbar';

var Carousel = require('react-responsive-carousel').Carousel;

class ngoInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            mobNumber: "",
            gender: "",
            birthdate: "",
            city: "",
            country: "",
            profession: "",
            interested_in: "",
            causes: [],
            skills: [],
            langusges: "",
            hear_about_us: ""

        }
        this.handleHeadline = this.handleHeadline.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleHeadline = (e) => {
        this.setState({
            headline: e.target.value
        })
    }


    render() {
        require('../styles/ngoInfo.css');
        let redirect = null;

        return (
            <div>
                {redirect}

                <Navbar />

                <div className="myForm greyBackground">
                    <form>
                        <div class="form-group ">
                            <h3>Tell us something about your NGO!</h3>
                        </div>
                        <div className="formBox"> 
                            <div class="form-group ">
                                <input onChange={this.handleusername} type="text" id="organisationname" className="myTextBox" placeholder="Organisation Name" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.handlefirstName} type="text" id="contactPersonName" className="myTextBox" placeholder="Contact Person Name" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handlelastName} id="contactNumber" className="myTextBox" placeholder="Contact Number" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handleemail} id="contactEmail" className="myTextBox" placeholder="Contact Email" />
                            </div><hr></hr>

                            <div class="form-group">
                                <textarea rows="4" cols="50" onChange={this.handlemobNumber} id="description" className="myTextBox" placeholder="Description" />
                            </div>
                            <div class="form-group">
                                <textarea rows="4" cols="50" onChange={this.handlegender} id="mission" className="myTextBox" placeholder="Mission" />
                            </div>

                            <div class="form-group">
                                <textarea rows="4" cols="50" onChange={this.handlebirthdate} id="vision" className="myTextBox" placeholder="Vision" />
                            </div><hr></hr>

                            <h5>Industry:</h5>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Children and Youth
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Education
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Women Empowerment
                            </label><br></br>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Animals
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Community Development
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Environment
                            </label><br></br>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Seniors
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Health and Medicine
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Advocacy and HR
                            </label><br></br><br></br>
                            
                            <h5>What skills are you looking for:</h5>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Accounting
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Animation
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Fund Raising
                            </label><br></br>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Photography
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Event Management
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Computers
                            </label><br></br>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Content Writing
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Financial Planning
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" />Graphic Design
                            </label><br></br><br></br>
 
                            <button className="saveButton">SAVE</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ngoInfo;