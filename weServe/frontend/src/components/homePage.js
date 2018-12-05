import React, { Component } from 'react';

 
//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/

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
            opportunityResults: people
            /* clickedUser:"Lauren Miller",
             clickedUserDetails:"Amazon Recruiter"*/
        }
        /*this.handleCreateNewMesage = this.handleCreateNewMesage.bind(this);
        this.handleClickedViewMsg = this.handleClickedViewMsg.bind(this);*/
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

        let DisplayMsgList = null;
        DisplayMsgList = (
             
             <div class="flex-container ">
                {this.state.opportunityResults.map((opportunity, index) => (
                    <div key={index} >

                        <div class="card-title firstheight" style={{'textAlign':'center'}}>  
                            <h4>{opportunity.opp_name}</h4>
                        </div>
                        <div class="card-body secondheight">
                            <div className="row ">
                                <div class="col-sm-2 col-md-2 col-lg-2  "> 
                                </div>
                                <div class="col-sm-8 col-md-8 col-lg-8  ">
                                    <div >{opportunity.start_date}-{opportunity.end_date} </div>
                                    <div >{opportunity.hrs}hrs/week</div> 
                                    <div >{opportunity.location} </div>
                                </div>
                            </div>
                        </div> 
                        <div class="card-body thirdheight">  
                            <button className="mysendButton"> Send</button>
                        </div>
                         
                    </div>
                ))}
            </div> 
        )

        return (
            <div>
                {redirect}

                <Navbar />

                <div  class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner imageHeight">
                        <div class="carousel-item active">
                            <img src={homePageBackground }/>     
                        </div>
                        <div class="carousel-item ">
                            <img src={homePageBackground2} />
                        </div>
                        <div class="carousel-item">
                            <img src={homePageBackground3}/>
                        </div>
                         
                        <div class="carousel-caption">
                            <h3 style={{ "color": "white" }}>Raise Your Helping Hand</h3>
                            <button className="joinUsButton"><h4>JOIN US TODAY!</h4></button>
                        </div>
                    </div>
                </div>
 
                <div className="greyBackground">
                    <br></br>     
                    <h2 className="textCenter">FEATURED OPPORTUNITIES</h2>
                    <br></br>

                    
                    {DisplayMsgList}
                </div>
            </div>
        )
    }
}

export default homePage;