import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GoogleLogin from 'react-google-login'; import { ROOT_URL } from '../constants/constants';
import Navbar from '../components/navbar';


class login extends Component {
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
            openPopup: false,
            handelOpportunity: "",
            gender: "",
            age: "",
            city: ""

        }
        this.login = this.login.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleOpportunity = this.handleOpportunity.bind(this)
        this.handleGender = this.handleGender.bind(this)
        this.fieldChangeHandler = this.fieldChangeHandler.bind(this)
        this.update=this.update.bind(this)
    }

    fieldChangeHandler(e) {
        let changedVar = {}
        changedVar[e.target.name] = e.target.value
        this.setState(changedVar)
    }

    handleOpportunity(e) {
        this.setState({
            handelOpportunity: e.target.value
        })
    }

    handleGender(e) {
        this.setState({
            gender: e.target.value
        })
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
                type: "O"
            }


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
                                myData: test
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




        }


    }


    update() {
        let data = {
            username: this.state.email,  //add here
            age: this.state.age,
            city: this.state.city,
            gender: this.state.gender,
            cause: [this.state.handelOpportunity],

        }

        axios.post(`${ROOT_URL}/user/signup_google`, data, { withCredentials: true })
            .then(response => {
                console.log(response)

                if (response.data) {
                    if (response.data.status === 1) {
                        console.log(response)
                        //     console.log(response.data.info)
                        localStorage.setItem('myData', JSON.stringify(data));
                        document.getElementById("addData").click();


                    } else if (response.data.status === 0) {
                        alert("Something went wrong. Try again");
                    }
                }
            }, (error) => {
                console.log(error)
                alert("something went wrong, please try again!")
            });

    }

    signup(response) {
        console.log(response)
        let data = {
            email: response.email,
            fname: response.givenName,
            lname: response.familyName,
            pwd: "0",
            type: "V",
            username: response.email,


        }
        this.setState({
            email: response.email
        })

        axios.post(`${ROOT_URL}/user/volunteer/signup`, data, { withCredentials: true })
            .then(response => {
                console.log(response)

                if (response.data) {
                    if (response.data.status === 1) {
                        console.log(response)
                        //     console.log(response.data.info)
                        localStorage.setItem('myData', JSON.stringify(data));
                        document.getElementById("addData").click();


                    } else if (response.data.status === 0) {
                        localStorage.setItem('myData', JSON.stringify(data));

                        this.setState({
                            authFlag: true
                        })
                    }
                }
            }, (error) => {
                console.log(error)
                alert("something went wrong, please try again!")
            });
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
        require('../styles/login.css')

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
        // if (this.state.openPopup) {
        //     document.getElementById("#addData").click();
        // }
        const responseGoogle = (response) => {
            console.log(response.profileObj);
            if (response && response.profileObj) {
                this.signup(response.profileObj);

            }
        }

        if (this.state.myData) {
            redirectVar = <Redirect to="/OwnerDashboard" />
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
                                            <div class="remember checkbox traveler" style={{ marginTop: "15px" }}>
                                                <label for="rememberMe">
                                                    OR
                                            </label>
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <GoogleLogin
                                                clientId="508724424345-68dh2fuok6tduesmtfhad0o2f6ild7km.apps.googleusercontent.com"
                                                buttonText="Login with Google"
                                                onSuccess={responseGoogle}
                                                onFailure={responseGoogle} />
                                        </div>
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



                    <button type="button" style={{display:"none"}} class="btn btn-info btn-lg" id="addData" data-toggle="modal" data-target="#myModal">Open Modal</button>

                    <div id="myModal"  class="modal fade" role="dialog">
                        <div class="modal-dialog">

                            <div class="modal-content">
                                <div class="modal-header">
                                    {/* <button type="button" class="close" data-dismiss="modal">&times;</button> */}
                                    <h4 class="modal-title">Please fill out following information</h4>
                                </div>
                                <div class="modal-body">
                                   <div style={{marginTop:"10px"}}><input style={{ padding: "10px",width:"100%" }} name="city" onChange={this.fieldChangeHandler} placeholder="city" /></div>
                                   <div style={{marginTop:"10px"}}> <input style={{ padding: "10px",width:"100%" }} name="age" onChange={this.fieldChangeHandler} placeholder="age" /></div>
                                   <div style={{marginTop:"10px"}}><select onChange={this.handleOpportunity} class="form-control myWidth" id="sel1">
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
                                    </select></div> 
                                    <div style={{marginTop:"10px"}}>  <select onChange={this.handleGender} class="form-control myWidth" id="sel1">
                                        <option value="" >Select gender...</option>
                                        <option value="Male" selected={this.state.gender == "Male"}>Male</option>
                                        <option value="Female" selected={this.state.gender == "Female"}>Female</option>

                                    </select></div> 
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal" onClick={this.update}>okay</button>
                                </div>
                            </div>

                        </div>
                    </div>







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

export default login;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}