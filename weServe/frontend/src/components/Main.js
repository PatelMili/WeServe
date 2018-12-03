import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import homePage from './homePage';
import readMore from './readMore';
import aboutUs from './aboutUs';
import userInfo from './userInfo';
 
class Main extends Component {
    render() {
        return (
            <div>

                <Route exact path="/" component={homePage} />
                <Route exact path="/homePage" component={homePage} />
                <Route exact path="/readMore" component={readMore} />
                <Route exact path="/aboutUs" component={aboutUs} />
                <Route exact path="/userInfo" component={userInfo} />

            </div>
        )
    }
}
//Export The Main Component
export default Main;