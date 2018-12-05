import React, { Component } from 'react';

 
//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/

import Navbar from '../components/navbar'; 

var Carousel = require('react-responsive-carousel').Carousel;

class readMore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ngoName:"Healing Dove Foundation",
            ngoInfo:"aekfjhj"
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

         

        return (
            <div>
                {redirect}

                <Navbar />
 
                <div className="greyBackground">
                    <br></br>     
                    <h2 className="textCenter" style={{"color":"green"}}>{this.state.ngoName}</h2>
                    <br></br>
                    <p className="infoPadding">{this.state.ngoInfo}</p><br></br>
                    <button className="joinUsButton">Join Us</button>
                </div>
            </div>
        )
    }
}

export default readMore;