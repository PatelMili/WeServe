import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { ROOT_URL } from '../constants/constants';
import Navbar from '../components/navbar';

class signUpVolunteer extends Component {
    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            email: "",
            pswd: "",
            authFlag: false,
            errorFlag: false,
            invalidFlag: false,
            myData: myData,

            ///signup  volunteer data states
            username: "",
            fname: "",
            lname: "",
            email_state: "",
            pwd:"", 
            gender: "",
            age: "",
            city: "", 
            type:"V",

            handleCause:""
        }
        this.signupvolunteer = this.signupvolunteer.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCause = this.handleCause.bind(this);
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    handleCause = (e) => {
        console.log(e.target.value);
        this.setState({
            interested_in: e.target.value
        })
    }
    signupvolunteer = () => {
        let data = {
            username: this.state.email_state,
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email_state,
            pwd:this.state.pwd, 
            gender: this.state.gender,
            age: this.state.age,
            city: this.state.city, 
            type:"V",
            cause:this.state.handleCause
        }
        console.log(this.state.handleCause);
        axios.post(`${ROOT_URL}/user/volunteer/signup`, data, { withCredentials: true })
            .then(response => {
                console.log(response)
                if (response.data) {
                    if (response.data.status === 1) {
                        console.log(response)
                        alert("Volunteer successfully signed up")
                        //     console.log(response.data.info)
                        localStorage.setItem('myData', JSON.stringify(data));
                       // document.getElementById("addData").click();
                    } else if (response.data.status === 0) {
                        alert("Something went wrong. Try again");
                    }
                }
            }, (error) => {
                console.log(error)
                alert("something went wrong, please try again!")
            });
    }
    
    /* login() {
        var headers = new Headers();

        if (this.state.email && this.state.pswd && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {


            const data = {
                email: this.state.email,
                password: this.state.pswd,
                type: "O"
            }


            // axios.post(`${ROOT_URL}/login`, data, { withCredentials: true })
            //     .then(response => {
            //         if (response.data.status == 1) {
            //             let res = {
            //                 status: 1,
            //                 data: {
            //                     uid: response.data.info.uid,
            //                     email: response.data.info.email,
            //                     firstname: response.data.info.firstname,
            //                     lastname: response.data.info.lastname,
            //                     profileImage: response.data.info.profileImage,
            //                     type: response.data.info.type
            //                 }
            //             }
            //             dispatch({ type: 'SAVEMYDATA', payload: res });
            //             return response;
            //         } else {
            //             return response;
            //         }
            //     }, (error) => {

            //         return error;
            //     });
            this.props.onSubmitHandle(data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log(response.data)
                        if (response.data) {
                            if (response.data.status === 1) {
                                console.log(response.data.info)
                                localStorage.setItem('myData', JSON.stringify(response.data.info));
                                let test = JSON.parse(localStorage.getItem('myData'));
                                // console.log(JSON.parse(test));
                                console.log(test.firstname);
                                this.setState({
                                    authFlag: true,
                                    invalidFlag: false,
                                    myData: test
                                })
                            } else if (response.data.status === -1) {
                                this.setState({
                                    invalidFlag: true
                                })
                            }
                        }

                    } else {
                        this.setState({
                            authFlag: false
                        })
                    }
                });
        } else {
            this.setState({
                errorFlag: true
            })
        }


    } */

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
        require('../styles/signUpVolunteer.css')

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
                <span>
                    The email or password you entered is incorrect.
            </span>
            </div>
        }

        const responseGoogle = (response) => {
            console.log(response);
        }

        /*  if (this.state.myData) {
             redirectVar = <Redirect to="/OwnerDashboard" />
         } */

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
                                        <div className="padding5" style={{ "font-size": "25px" }}>Join Us Today</div>
                                        <hr style={{ margin: '0px' }}></hr>
                                        {invalid}
                                        <div className="padding5 " style={{ "margin-top": "10px" }}>
                                            <input onChange={this.onChange} className="inputField" type="text" name="fname" placeholder="First Name"></input>

                                        </div>
                                        <div className="padding5 " style={{ "margin-top": "10px" }}>
                                            <input onChange={this.onChange} className="inputField" type="text" name="lname" placeholder="Last Name"></input>

                                        </div>

                                        <div className="padding5 " style={{ "margin-top": "10px" }}>
                                            <input onChange={this.onChange} className="inputField" type="text" name="username" placeholder="UserName"></input>

                                        </div>

                                        <div className="padding5 " style={{ "margin-top": "10px" }}>
                                            <input onChange={this.onChange} className="inputField" type="text" name="email_state" onChange={this.handleEmailChange} placeholder="Email address"></input>
                                            {errorEmail}
                                        </div>
                                        <div className="padding5">
                                            <input onChange={this.onChange} className="inputField" type="password" name="pwd" onChange={this.handlePasswordChange} placeholder="Password"></input>
                                            {errorPswd}
                                        </div>


                                        <div className="padding5 " style={{ "margin-top": "10px" }}>
                                            <input onChange={this.onChange} className="inputField" type="text" name="city" placeholder="City"></input>

                                        </div>

                                        <select onChange={this.handleCause} class="form-control mywidth1" id="sel1">
                                            <option value="" >Tell us what you care for</option>
                                            <option value="Children and Youth" selected={this.state.handleCause == "Children and Youth"}>Children and Youth</option>
                                            <option value="Education and Literacy" selected={this.state.handleCause == "Education"}>Education</option>
                                            <option value="Animals" selected={this.state.handleCause == "Animals"}>Animals</option>
                                            <option value="Community Development" selected={this.state.handleCause == "Community Development"}>Community Development</option>
                                            <option value="Enviornment" selected={this.state.handleCause == "Enviornment"}>Enviornment</option>
                                            <option value="Senior" selected={this.state.handleCause == "Senior"}>Senior </option>
                                            <option value="Health and Medicine" selected={this.state.handleCause == "Health and Medicine"}>Health and Medicine</option>
                                            <option value="Advocacy and HR" selected={this.state.handleCause == "Advocacy and HR"}>Advocacy and HR</option>
                                            <option value="Specially Abled People" selected={this.state.handleCause == "Specially Abled People"}>Specially Abled People</option>
                                        </select>

                                        <div className="padding5 " style={{ "margin-top": "10px" }}>
                                            <input onChange={this.onChange} className="inputField" type="text" name="age" placeholder="Age"></input>

                                        </div>

                                        <div className="padding5 " style={{ "margin-top": "10px" }}>
                                            <input onChange={this.onChange} className="inputField" type="text" name="gender" placeholder="Gender"></input>
                                        </div>
                                        
                                        <div class="form-group padding5" style={{ "marginBottom": '0px' }}>
                                            <input type="submit" className="btn btn-primary  " onClick={this.signupvolunteer} value="Sign Up" id="loginButton" tabindex="4" />

                                        </div>

                                        <div><a href="/login">Already have an account? Login</a></div>
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

export default signUpVolunteer;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}