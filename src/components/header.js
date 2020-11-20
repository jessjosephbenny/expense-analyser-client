import React from 'react';
import {compose} from 'redux';
import { Navbar, Button, Alignment } from '@blueprintjs/core'
import { connect } from 'react-redux';
import { SET_USER_LOGOUT } from '../reduxflow/reducerActionTypes/expenseReducerActionTypes';
class Header extends React.Component {
  logoutUser = ()=>{
    const {logout} = this.props;
    logout();
    window.location.href = '/home';
  }
  render() {
    const { authenticated } = this.props;
    return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading> Expense Analyser</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {authenticated?<Button className="bp3-minimal" icon="log-out" text="Logout" onClick={this.logoutUser}/>
          :<Button className="bp3-minimal" icon="log-in" text="Login"/>
          }
        </Navbar.Group>
      </Navbar>
    )
  }
}
const mapStatestoProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}
const mapDispatchtoProps = (dispatch) => {
  return{
    logout : () => dispatch({type:SET_USER_LOGOUT})
  }
}
export default compose(
  connect(mapStatestoProps,mapDispatchtoProps)
  )(Header);