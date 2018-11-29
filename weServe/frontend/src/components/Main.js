import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import homePage from './homePage';
 
 
class Main extends Component {
    render() {
        return (
            <div>

				 
                <Route exact path="/" component={homePage} />
                <Route exact path="/homePage" component={homePage} />
                 
            </div>
        )
    }
}
//Export The Main Component
export default Main;