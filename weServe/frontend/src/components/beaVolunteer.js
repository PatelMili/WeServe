import React, { Component } from 'react';


//import '../travelerLogin/travelerLogin.css';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { ROOT_URL } from '../constants/constants';

import Navbar from '../components/navbar';
import homePageBackground from '../assets/images/homePageBackground.jpg';
import homePageBackground2 from '../assets/images/homePageBackground2.jpg';
import homePageBackground3 from '../assets/images/homePageBackground3.jpg';

var Carousel = require('react-responsive-carousel').Carousel;

class homePage extends Component {
    constructor(props) {
        super(props);

        const people = [];
        for (let i = 0; i < 6; i++) {
            people.push({
                opp_name: "Chidren and Youth",
                start_date: "Nov 2018",
                end_date: "Jan 2019",
                hrs: 5,
                location: "Mumbai"
            });
        } 

        this.state = {
            opportunityResults: [], 
            handleOpportunity:"" 
        } 
        this.handleOpportunity = this.handleOpportunity.bind(this);
        this.go = this.go.bind(this);
    }

    handleOpportunity = (e) => {
        this.setState({
            handleOpportunity: e.target.value
        })
    } 
    go = () => {
         
        console.log("-------------------------"+this.state.handleOpportunity);
        let data = {
            causes: this.state.handleOpportunity
        } 

        axios.put(`${ROOT_URL}/user/search/ngo/causes`, data, { withCredentials: true })
            .then(response => {
                console.log("Received data"+JSON.stringify(response.data.info.result.length))

               // console.log("Received data"+JSON.stringify(response.data.info.result[0].opportunities_posted))
               if(response.data.info.result.length>0)
               { if (response.data) {
                    if (response.data.status === 1) {
                         console.log(response)  
                          
                        this.setState({
                            opportunityResults: response.data.info.result[0].opportunities_posted
                        })
                        console.log("Fetched user details")

                    } else if (response.data.status === 0) {
                        alert("No data found. Try again");
                    }
                }
            }
            }, (error) => {
                console.log(error)
                alert("something went wrong, please try again!")
            });

    }

    render() {
        require('../styles/volunteerDashboard.css');
        let redirect = null;

        let DisplayMsgList = null;
        //location based
        DisplayMsgList = (

            <div class="flex-container ">

                {this.state.opportunityResults.map((opportunity, index) => (
                    <div key={index} >

                        <div class="card-title firstheight" style={{ 'textAlign': 'center' }}>
                            <h4>{opportunity.opp_name}</h4>
                        </div>
                        <div class="card-body secondheight">
                            <div className="row ">
                                <div class="col-sm-2 col-md-2 col-lg-2  ">
                                    <i class="icon ion-calendar ionIcon"></i> <br></br>
                                    <i class="icon ion-clock ionIcon"></i> <br></br>
                                    <i class="icon ion-navigate ionIcon"></i>
                                </div>
                                <div class="col-sm-8 col-md-8 col-lg-8  ">
                                    <div className="bottomPadding">{opportunity.start_date.slice(0,10)} to {opportunity.end_date.slice(0,10)} </div>
                                    <div className="bottomPadding">{opportunity.hrs}hrs/week</div>
                                    <div >{opportunity.location} </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body thirdheight">
                            <button className="mysendButton"> Join Us Today!</button>
                            <button className="mysendButton"> Read More</button>
                        </div>

                    </div>
                ))}
            </div>
        )
        
        return (
            <div>
                {redirect}

                <Navbar />


                <div className="greyBackground">
                    <br></br>
                    <label for="sel1"><h6>Tell us what you care for:</h6></label>
                    <select onChange={this.handleOpportunity} class="form-control myWidth" id="sel1">
                        <option value="" >Select cause...</option>
                        <option value="Children and Youth" selected={this.state.handelOpportunity == "Children and Youth"}>Children and Youth</option>
                        <option value="Education and Literacy" selected={this.state.handelOpportunity == "Education"}>Education</option>
                        <option value="Animals" selected={this.state.handelOpportunity == "Animals"}>Animals</option>
                        <option value="Community Development" selected={this.state.handelOpportunity == "Community Development"}>Community Development</option>
                        <option value="Enviornment" selected={this.state.handelOpportunity == "Enviornment"}>Enviornment</option>
                        <option value="Senior" selected={this.state.handelOpportunity == "Senior"}>Senior </option>
                        <option value="Health and Medicine" selected={this.state.handelOpportunity == "Health and Medicine"}>Health and Medicine</option>
                        <option value="Advocacy and HR" selected={this.state.handelOpportunity == "Advocacy and HR"}>Advocacy and HR</option>
                        <option value="Specially Abled People" selected={this.state.handelOpportunity == "Specially Abled People"}>Specially Abled People</option>
                       
                    </select>

                    <button type="submit" className="mybutton" onClick={this.go} >GO</button>
                    <br></br><br></br>
                    {DisplayMsgList}
                    <br></br><br></br>
                </div>
            </div>
        )
    }
}

export default homePage;