import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Spinner } from 'evergreen-ui';

import Experiment from './pages/experiment';
import Header from './components/header';
import Dashboard from './pages/dashboard'
import HomeScreen from './pages/homeScreen';

import './App.css';


function App(props) {
  const { loading } = props;
  return (
    <div style={{ height: '100%' }}>
      <Header />
      <BrowserRouter>
        <Route path="/" exact>
          <Redirect to="/home"/>
        </Route>
        <Route path="/home"  component={HomeScreen} />
        <Route path="/dashboard"  component={Dashboard} />
        <Route path="/exp" component = {Experiment}/>
      </BrowserRouter>
      {loading ? <div style={{ position: 'absolute', left: 0, top: 0, height: '100vh', width: '100vw' }}>
        <div className="d-flex justify-content-center h-100">
          <div className="d-flex flex-column justify-content-center">
            <Spinner size={64} />
          </div>
        </div>
      </div> : null}
    </div>

  );
}
const mapStateToProps = (state) => {
  return {
    firstLoad: state.expenseState.firstLoad,
    loading: state.expenseState.loading
  }
}
export default connect(mapStateToProps, null)(App);
