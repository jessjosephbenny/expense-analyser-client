import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {createStore,compose,applyMiddleware} from 'redux';

import rootSaga from './reduxflow/rootSaga';
import rootReducer from './reduxflow/rootReducer';

const sagaMiddleWare = createSagaMiddleware();

let middleWares = applyMiddleware(sagaMiddleWare,logger);
const intitialState = {
  auth:{
    authToken:localStorage.getItem('token')?localStorage.getItem('token'):"",
    authenticated:localStorage.getItem('token')?true:false
  }
}
const store = createStore(rootReducer,intitialState,compose(middleWares));
sagaMiddleWare.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
