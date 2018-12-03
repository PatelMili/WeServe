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
                                <input onChange={this.handleusername} type="text" id="username" className="myTextBox" placeholder="Username" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.handlefirstName} type="text" id="firstName" className="myTextBox" placeholder="First Name" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handlelastName} id="lastName" className="myTextBox" placeholder="lastName" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handleemail} id="email" className="myTextBox" placeholder="email" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handlemobNumber} id="mobNumber" className="myTextBox" placeholder="mobNumber" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handlegender} id="gender" className="myTextBox" placeholder="Gender" />
                            </div>

                            <div class="form-group">
                                <input type="number" onChange={this.handlebirthdate} id="birthdate" className="myTextBox" placeholder="Birthdate" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handlecity} id="city" className="myTextBox" placeholder="city" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handlecountry} id="country" className="myTextBox" placeholder="country" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handleprofession} id="profession" className="myTextBox" placeholder="profession" />
                            </div>

                            <h5>Qualifications</h5><br></br>
                            <div class="form-group">
                                <input type="text" onChange={this.handlegender} id="gender" className="myTextBox" placeholder="Gender" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handlegender} id="gender" className="myTextBox" placeholder="Gender" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handlegender} id="gender" className="myTextBox" placeholder="Gender" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handlegender} id="gender" className="myTextBox" placeholder="Gender" />
                            </div>
                            <div class="form-group">
                                <input type="text" onChange={this.handlegender} id="gender" className="myTextBox" placeholder="Gender" />
                            </div>
                            <div className="form-group buttonForm1">
                                <button onClick={this.handleGotoDetails} className="buttonForm" type="submit">next</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default userInfo;