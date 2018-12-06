import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ROOT_URL } from '../constants/constants';



//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/

import Navbar from '../components/navbar';

class readMore extends Component {
    constructor(props) {
        super(props);
        let people1=[];
        for (let i = 0; i < 6; i++) {
            people1.push({
                opp_name: "Chidren and Youth",
                ngo: "Vhelp",
                start_date: "Nov 2018",
                end_date: "Jan 2019",
                hrs: 5,
                location: "Mumbai"
            });
        }
        const people = [];
        people.push(

            { opp_name: "wkrhg", opp_description: "dfz" }, { opp_name: "f", opp_description: "dr" }
        );

        this.state = {
            opportunityResults: people1,
            ngoName: "Healing Dove Foundation",
            ngoVision: "Vision",
            ngoMission: "Mission"

        }
        /*this.handleCreateNewMesage = this.handleCreateNewMesage.bind(this);
        this.handleClickedViewMsg = this.handleClickedViewMsg.bind(this);*/
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let info = JSON.parse(localStorage.getItem("opportunity"))
        let data = {
            organisation_name: info.organisation_name
        }
        axios.put(`${ROOT_URL}/user/ngo_detail`, data, { withCredentials: true })
            .then(response => {
                console.log(response)
                if (response && response.status == 200) {

                    let res = response.data.info.result[0]
                    this.setState({
                        ngoName: res.organisation_name,
                        ngoVision: res.vision,
                        ngoMission: res.mission,
                        opportunityResults: res.opportunities_posted
                    })
                }
            })
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
                        {/* <div class="card-body thirdheight">
                            <Link to='/login'><button className="mysendButton"> Join Us Today!</button></Link>
                            <button className="mysendButton" onClick={() => { this.readMore(opportunity) }}> Read More</button>
                        </div> */}

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

                    {/* <button className="joinUsButton">Contact</button> */}
                    
                    <Link to='/login'> <button className="joinUsButton">Join Us</button></Link>
                </div>
            </div>
        )
    }
}

export default readMore;