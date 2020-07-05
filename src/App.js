import React from 'react';
import './App.css';
import Header from './components/header';
import Dashboard from './components/dashboard';
import UploadScreen from './components/uploadScreen';
import { connect } from 'react-redux';
import { Spinner } from 'evergreen-ui';


function App(props) {
  const {firstLoad,loading} = props;
  console.log('firstLoad',firstLoad);
  return (
    <div>
        <Header/>
        {firstLoad?<UploadScreen />:<Dashboard/>}
        {loading?<div style={{position:'absolute',left:0,top:0,height:'100vh',width:'100vw'}}>
          <div className="d-flex justify-content-center h-100">
            <div className="d-flex flex-column justify-content-center">
              <Spinner size={64}/>
            </div>
          </div>
        </div>:null}
    </div>

  );
}
const mapStateToProps = (state) => {
  return {
    firstLoad: state.expenseState.firstLoad,
    loading: state.expenseState.loading
  }
}
export default connect(mapStateToProps,null)(App);
