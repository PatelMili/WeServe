import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import GoogleLogin from 'react-google-login';import { ROOT_URL } from '../constants/constants';
import Navbar from './navbar';
import { ROOT_URL } from "../constants/constants"


class loginNGO extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            email: "",
            pswd: "",
            authFlag: false,
            errorFlag: false,
            invalidFlag: false,
            myData: myData
        }
        this.login = this.login.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    login() {
        var headers = new Headers();


        if (this.state.email && this.state.pswd && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {


            const data = {
                username: this.state.email,
                pwd: this.state.pswd,
                type: "N"
            }
            console.log(data)

            axios.post(`${ROOT_URL}/user/login`, data, { withCredentials: true })
                .then(response => {
                    console.log(response)

                    if (response.data) {
                        if (response.data.status === 1) {
                            console.log(response.data.info)
                            localStorage.setItem('myData', JSON.stringify(response.data.info));
                            
                            this.setState({
                                authFlag: true,
                                invalidFlag: false,
                                // myData: test
                            })
                        } else if (response.data.status === 0) {
                            this.setState({
                                invalidFlag: true
                            })
                        }
                    }
                }, (error) => {

                    console.log(error)
                    alert("something went wrong, please try again!")
                });


        //     this.props.onSubmitHandle(data)
        //         .then(response => {
        //             console.log("Status Code : ", response.status);
        //             if (response.status === 200) {
        //                 console.log(response.data)
        //                 if (response.data) {
        //                     if (response.data.status === 1) {
        //                         console.log(response.data.info)
        //                         localStorage.setItem('myData', JSON.stringify(response.data.info));
        //                         let test = JSON.parse(localStorage.getItem('myData'));
        //                         // console.log(JSON.parse(test));
        //                         console.log(test.firstname);
        //                         this.setState({
        //                             authFlag: true,
        //                             invalidFlag: false,
        //                             myData: test
        //                         })
        //                     } else if (response.data.status === -1) {
        //                         this.setState({
        //                             invalidFlag: true
        //                         })
        //                     }
        //                 }

        //             } else {
        //                 this.setState({
        //                     authFlag: false
        //                 })
        //             }
        //         });
        // } else {
        //     this.setState({
        //         errorFlag: true
        //     })


        }


    }



    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            pswd: e.target.value
        })
    }
    render() {
        require('../styles/loginNGO.css')

        let errorEmail, errorPswd, invalid, redirectVar;

        if (this.state.errorFlag) {
            if (!this.state.email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {

                errorEmail = <span className="error">Enter valid email</span>
            }
            if (!this.state.pswd) {
                errorPswd = <span className="error">Enter password</span>
            }
        }
        if (this.state.invalidFlag) {
            invalid = <div style={{ marginTop: '10px' }} className="invalid">
                <span style={{color:"red"}}>
                    The email or password you entered is incorrect.
            </span>
            </div>
        }



        if (this.state.authFlag) {
            redirectVar = <Redirect to="/ngoDashboard" />
        }

        return (

            <div >
                {redirectVar}
                <Navbar />




                <div>

                    <div >
                        <div className="container-fluid" style={{ backgroundColor: "#f4f4f4", marginTop: '0%' }}>
                            <div className="row">
                                <div className="col-md-3"></div>
                                

                                <div className="col-md-6">
                                    <div className="formProps">
                                        <div className="padding5" style={{ "font-size": "25px" }}>Login</div>
                                        <hr style={{ margin: '0px' }}></hr>
                                        {invalid}
                                        <div className="padding5 " style={{ "margin-top": "10px" }}>
                                            <input className="inputField" type="text" onChange={this.handleEmailChange} placeholder="Email address"></input>
                                            {errorEmail}
                                        </div>
                                        <div className="padding5">
                                            <input className="inputField" type="password" onChange={this.handlePasswordChange} placeholder="Password"></input>
                                            {errorPswd}
                                        </div>

                                        <div class="form-group padding5" style={{ "marginBottom": '0px' }}>
                                            <input type="submit" className="btn btn-primary  " onClick={this.login} value="Log In" id="loginButton" tabindex="4" />
                                            {/* <div class="remember checkbox traveler" style={{marginTop:"15px"}}>
                                                <label for="rememberMe">
                                                    OR
                                            </label>
                                            </div> */}
                                        </div>
                                        {/* <div style={{marginBottom:"20px"}}>
                                            <GoogleLogin
                                                clientId="508724424345-68dh2fuok6tduesmtfhad0o2f6ild7km.apps.googleusercontent.com"
                                                buttonText="Login with Google"
                                                onSuccess={responseGoogle}
                                                onFailure={responseGoogle} />
                                        </div> */}
                                        {/* <hr style={{ margin: '0px', marginBottom: "10px" }}></hr> */}

                                    </div>
                                </div>
                                <div className="col-md-3"></div>

                            </div>
                            <br />
                            <br />
                            <br />
                        </div>

                    </div>
                    <br />

                </div>

            </div>
        )
    }
}



// const mapStateToProps = state => {
//     return {
//         mydata: state.reducer.myData
//     }
// }

// const mapDispatchStateToProps = dispatch => {
//     return {
//         onSubmitHandle: (data) => {
//             return 
//         }

//     }
// }



// export default connect(mapStateToProps, mapDispatchStateToProps)(LoginOwner);

export default loginNGO;

// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }