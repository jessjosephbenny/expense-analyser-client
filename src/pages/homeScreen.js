import React, { Component } from 'react';
import './pageStyles/homeScreen.css'
import LoginComponent from './pageComponents/loginComponent';
import { Route, Redirect } from 'react-router-dom';
import RegisterComponent from './pageComponents/registerComponent';
import UploadScreen from './uploadScreen';
import { connect } from 'react-redux';

class HomeScreen extends Component {
    render() {
        const {authenticated} = this.props;
        const location = this.props.history.location.pathname;
        if(authenticated){
            return <Redirect to="/dashboard"/>
        }
        return (
            <div class="container-fluid">
                <div class="row no-gutter">
                    <div class="col-md-7 d-none d-md-flex bg-light">
                        <UploadScreen location={location}/>
                    </div>
                    <div class="col-md-5 bg-light">
                        <Route path="/home/register" exact component ={RegisterComponent}/>
                        <Route path = "/home/"  component = {LoginComponent}/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStatestoProps = (state) => {
    return{
        authenticated : state.auth.authenticated
    }
}
export default connect(mapStatestoProps)(HomeScreen);