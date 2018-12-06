import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { Link } from 'react-router-dom';
import axios from 'axios';

//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/

import Navbar from '../components/navbar';
import homePageBackground from '../assets/images/homePageBackground.jpg';
import homePageBackground2 from '../assets/images/homePageBackground2.jpg';
import homePageBackground3 from '../assets/images/homePageBackground3.jpg';
import { ROOT_URL } from '../constants/constants';

var Carousel = require('react-responsive-carousel').Carousel;

class homePage extends Component {
    constructor(props) {
        super(props);

        const people = [];



        for (let i = 0; i < 6; i++) {
            people.push({
                opp_name: "Chidren and Youth",
                ngo: "Vhelp",
                start_date: "Nov 2018",
                end_date: "Jan 2019",
                hrs: 5,
                location: "Mumbai"
            });
        }
        const volunteer = [];
        for (let i = 0; i < 6; i++) {
            volunteer.push({
                fname: "Devanshi",
                lname: "trivedi",
                opportunities_enrolled: [{ opp_name: "opp1", opp_description: "desc1" }, { opp_name: "opp2", opp_description: "desc2" }],
                causes: ["care", "enviornment"],
                age: 25
            });
        }

        this.state = {
            opportunityResults: people,
            volunteerResults: volunteer,
            email: "",
            lat: 0,
            longi: 0,
            current: "",


        }
        this.showPosition = this.showPosition.bind(this)
        this.showError = this.showError.bind(this)
        this.getAllData = this.getAllData.bind(this)
        this.readMore = this.readMore.bind(this)
        /*this.handleCreateNewMesage = this.handleCreateNewMesage.bind(this);
        this.handleClickedViewMsg = this.handleClickedViewMsg.bind(this);*/
    }


    readMore(opp) {

        localStorage.setItem("opportunity", JSON.stringify(opp))
        this.setState({
            authFlag: true
        })
    }


    showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                // x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                // x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                // x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                // x.innerHTML = "An unknown error occurred."
                break;
        }
        this.getAllData(0, 0)
    }


    showPosition(position) {

        this.getAllData(position.coords.latitude, position.coords.longitude)


    }



    getAllData(lat, longi) {
        let data = {
            lat: lat,
            long: longi
        }
        axios.put(`${ROOT_URL}/user/search/opportunity/location/lat_long`, data, { withCredentials: true })
            .then(response => {
                console.log(response)
                if (response && response.status == 200)
                    if (response.data.info.result_ngo.length > 9) {
                        this.setState({
                            opportunityResults: response.data.info.result_ngo.splice(0,9),
                            volunteerResults: response.data.info.result_volunteer

                        })
                    } else {
                        this.setState({
                            opportunityResults: response.data.info.result_ngo,
                            volunteerResults: response.data.info.result_volunteer

                        })
                    }

            });
    }
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
        } else {
            this.getAllData(0, 0)
            // x.innerHTML = "Geolocation is not supported by this browser.";
        }

    }
    /*  handleCreateNewMesage = () => {
          this.setState({
              createMsgFlag : true
          });
      }
      handleClickedViewMsg = () => {
          this.setState({
              createMsgFlag : false
          });
      }*/

    render() {
        require('../styles/homePage.css');
        let redirect = null;

        if (this.state.authFlag) {
            redirect = <Redirect to="/readMore" />
        }
        let DisplayMsgList = null;
        //location based
        DisplayMsgList = (

            <div class="flex-container ">

                {this.state.opportunityResults.map((opportunity, index) => (
                    <div key={index} >

                        <div class="card-title firstheight" style={{ 'textAlign': 'center' }}>
                            <h4>{opportunity.opp_name}</h4>
                        </div>
                        <div style={{ 'textAlign': 'center' }}>{opportunity.organisation_name}</div>

                        <div class="card-body secondheight">
                            <div className="row ">
                                <div class="col-sm-2 col-md-2 col-lg-2  ">
                                    <i class="icon ion-calendar ionIcon"></i> <br></br>
                                    <i class="icon ion-clock ionIcon"></i> <br></br>
                                    <i class="icon ion-navigate ionIcon"></i>
                                    <i class="icon ion-star ionIcon"></i>
                                </div>
                                <div class="col-sm-8 col-md-8 col-lg-8  ">
                                    <div className="bottomPadding">{opportunity.start_date.slice(0, 10)} - {opportunity.end_date.slice(0, 10)} </div>
                                    <div className="bottomPadding">{opportunity.hrs}hrs/week</div>
                                    <div >{opportunity.location} </div>
                                    <div style={{ marginTop: "10px" }}>{opportunity.rating} </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body thirdheight">
                            <Link to='/login'><button className="mysendButton"> Join Us Today!</button></Link>
                            <button className="mysendButton" onClick={() => { this.readMore(opportunity) }}> Read More</button>
                        </div>

                    </div>
                ))}
            </div>
        )

        let userList = null;
        //student based
        userList = (

            <div class="flex-container ">
                {this.state.volunteerResults.map((volunteer, index) => (
                    <div key={index} >

                        <div class="card-title firstheight" style={{ 'textAlign': 'center' }}>
                            <h4>{volunteer.fname} {volunteer.lname}</h4>
                        </div>
                        <div class="card-body secondheight">
                            <div className="row">
                                <div class="col-sm-8 col-md-8 col-lg-4  ">
                                    <p class=" fonts bottomPadding"><b>Causes Served:</b> </p>
                                </div>
                                <div class="col-sm-8 col-md-8 col-lg-8  ">
                                    {/* {volunteer.causes.map((cause, index) => (
                                        <p key={index} className="leftpad">
                                            {cause}
                                        </p>
                                    ))} */}
                                    {volunteer.causes.toString()}
                                </div>
                            </div>
                            <p class=" fonts bottomPadding"><b>Age:</b> {volunteer.age} </p>
                            <p class=" fonts bottomPadding"><b>Number of opportunities enrolled in:</b> {volunteer.opportunities_enrolled.length} </p>

                        </div>
                        <div class="card-body thirdheight">
                            <Link to='/loginNGO'> <button className="mysendButton"> Apply!</button></Link>
                            <button className="mysendButton" data-toggle="modal" data-target="#myModal"> Read More</button>
                            <div id="myModal" class="modal fade" role="dialog">
                                <div class="modal-dialog">

                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <h4 style={{ color: "#7fc241" }}>{volunteer.fname} {volunteer.lname}</h4>
                                            <p>The volunteer is interested in serving for various
                                               causes like {volunteer.causes.map((cause, index) => (
                                                    <div key={index} >
                                                        <b>{cause}</b>
                                                    </div>
                                                ))}
                                            </p>
                                            <p>
                                                The volunteer has worked for various opportunities like
                                               {volunteer.opportunities_enrolled.map((cause, index) => (
                                                    <div key={index} >
                                                        <b>{cause.opp_name}</b>
                                                        <p>{cause.opp_description}</p>
                                                    </div>
                                                ))}
                                            </p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        )

        return (
            <div>
                {redirect}

                <Navbar />

                <div class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner imageHeight">
                        <div class="carousel-item active">
                            <img src={homePageBackground} />
                        </div>
                        <div class="carousel-item ">
                            <img src={homePageBackground2} />
                        </div>
                        <div class="carousel-item">
                            <img src={homePageBackground3} />
                        </div>

                        <div class="carousel-caption">
                            <h3 style={{ "color": "white" }}>Raise Your Helping Hand</h3>{/* 
                            <button className="joinUsButton"><h4>JOIN US TODAY!</h4></button> */}
                        </div>
                    </div>
                </div>

                <div className="greyBackground">
                    <br></br>
                    <h2 className="textCenter">FEATURED OPPORTUNITIES</h2>
                    <br></br>
                    {DisplayMsgList}
                    <br></br><br></br>
                    <div>
                        <h4>What volunteers have to say!</h4>
                    </div>
                    {userList}
                </div>
            </div>
        )
    }
}

export default homePage;