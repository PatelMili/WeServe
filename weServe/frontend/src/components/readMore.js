import React, { Component } from 'react';


//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/

import Navbar from '../components/navbar';

class readMore extends Component {
    constructor(props) {
        super(props);

        const people = [];
        people.push(

            { opp_name: "wkrhg", opp_description: "dfz" }, { opp_name: "f", opp_description: "dr" }
        );

        this.state = {
            opportunityResults: people,
            ngoName: "Healing Dove Foundation",
            ngoVision: "Vision",
            ngoMission: "Mission"
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
        require('../styles/readMore.css');
        let redirect = null;

        let DisplayMsgList = null;
        //location based
        DisplayMsgList = (

            <div class="flex-container ">
                
                {this.state.opportunityResults.map((opportunity, index) => (
                    <div key={index} >

                        <div class="card-title firstheight" style={{ 'textAlign': 'center' }}>
                            <h6>{opportunity.opp_name}</h6>
                            <h6>{opportunity.opp_description}</h6>
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
                    <h2 className="textCenter" style={{ "color": "green" }}>{this.state.ngoName}</h2>
                    <br></br>
                    <h5>Our Vision</h5>
                    <p className="infoPadding">{this.state.ngoVision}</p><br></br>

                    <h5>Our Mission</h5>
                    <p className="infoPadding">{this.state.ngoMission}</p><br></br>

                    <div>
                        <h4>Opportunities you can look into!</h4>
                    </div>
                    {DisplayMsgList}

                    <button className="joinUsButton">Contact</button>
                    <button className="joinUsButton">Join Us</button>
                </div>
            </div>
        )
    }
}

export default readMore;