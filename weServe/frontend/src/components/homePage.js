import React, { Component } from 'react';
//import '../travelerLogin/travelerLogin.css';
/*import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';*/
 

class homePage extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
        /*
                let DisplayMsgList = null;
                 
        
                DisplayMsgList = (
                    <div class="row userInvitations hoverEffect">
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <img src={this.state.msgListProfileImage} className="img-circle profileImage" />
                        </div>
                         
                        <div className="col-sm-9 col-md-9 col-lg-9 " onClick={this.handleClickedViewMsg}>
                            <h4>{this.state.msgListUserName}</h4>
                        </div>
                        
                    </div>
                )*/

        return (
            <div>
                {redirect}
                <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '', 'padding': ' 0%', 'backgroundColor': 'darkblue', "border-radius": "0px", marginBottom: "0px" }}>
                    hi
                </nav>
                <div  >hello</div>
                
            </div>
        )
    }
}



export default homePage;