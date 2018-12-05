import React, { Component } from 'react';

//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/

import Navbar from '../components/navbar';

var Carousel = require('react-responsive-carousel').Carousel;

class userInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            fname: "",
            lname: "",
            email: "",
            mobile_no: "",
            gender: "",
            birthdate: "",
            city: "",
            country: "",
            profession: "",
            interested_in: "",
            causes: [],
            skills: [],
            languages: "",
            hear_about_us: "",

            childrenAndYouth:false,
            education:false

        }
        this.onChange = this.onChange.bind(this);
        this.handleInterest = this.handleInterest.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleInterest = (e) => {
        console.log(e.target.value);
        this.setState({
            interested_in: e.target.value
        })
    }
    handleInputChange(e) {
         
        this.setState({
          [e.target.name]: e.target.checked
        });

      }
      handleSave = () => {
        console.log("education:"+this.state.education);
        console.log("candy:"+this.state.childrenAndYouth);
         
    }

    render() {
        require('../styles/userInfo.css');
        let redirect = null;

        return (
            <div>
                {redirect}

                <Navbar />

                <div className="myForm greyBackground">
                    <form>
                        <div class="form-group ">
                            <h3>Let's get started!</h3>
                        </div>
                        <div className="formBox">
                            <h5>Personal Information</h5><br></br>
                            <div class="form-group ">
                                <input onChange={this.onChange} name="username" type="text" id="username" className="myTextBox" placeholder="Username" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.onChange} name="fname" type="text" id="firstName" className="myTextBox" placeholder="First Name" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.onChange} name="lname" id="lastName" className="myTextBox" placeholder="Last Name" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.onChange} name="email" id="email" className="myTextBox" placeholder="Email" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.onChange} name="mobile_no" id="mobNumber" className="myTextBox" placeholder="Mobile Number" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.onChange} name="gender" id="gender" className="myTextBox" placeholder="Gender" />
                            </div>

                            <div class="form-group">
                                <input type="number" onChange={this.onChange} name="birthdate" id="birthdate" className="myTextBox" placeholder="Birthdate" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.onChange} name="city" id="city" className="myTextBox" placeholder="City" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.onChange} name="country" id="country" className="myTextBox" placeholder="Country" />
                            </div>


                            <h5>Qualifications</h5><br></br>
                            <div class="form-group">
                                <input type="text" onChange={this.onChange} name="profession" id="profession" className="myTextBox" placeholder="Profession" />
                            </div>
                            <div class="form-group">

                                <label for="sel1">I am interested in:</label>
                                <select onChange={this.handleInterest} class="form-control selectWidth" id="sel1">
                                    <option value="" >Select...</option>
                                    <option value="Yearly" selected={this.state.interested_in == "Yearly"}>Yearly</option>
                                    <option value="Monthly" selected={this.state.interested_in == "Monthly"}>Monthly</option>
                                    <option value="Weekly" selected={this.state.interested_in == "Weekly"}>Weekly</option>
                                    <option value="Daily" selected={this.state.interested_in == "Daily"}>Daily</option>
                                    <option value="One Time" selected={this.state.interested_in == "One Time"}>One Time</option>
                                </select>

                            </div>
                            <h5>Causes you care about:</h5>
                            <label class="checkbox-inline">
                                <input type="checkbox" 
                                    name="childrenAndYouth" 
                                    checked={this.state.childrenAndYouth}
                                    onChange={this.handleInputChange} />
                                Children and Youth
                            </label>

                            <label class="checkbox-inline">
                                <input type="checkbox"  
                                    name="education" 
                                    checked={this.state.education}
                                    onChange={this.handleInputChange} />
                                Education
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

                            <h5>Skills you can offer:</h5>
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

                            <div class="form-group">
                                <input type="text" onChange={this.onChange} name="languages" id="Languages" className="myTextBox" placeholder="Languages you speak" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.onChange} name="hear_about_us" id="howDidYouHearAboutUs" className="myTextBox" placeholder="How did you hear about us" />
                            </div>

                            <button className="saveButton" onClick={this.handleSave}>SAVE</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default userInfo;