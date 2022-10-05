import React, { StrictMode }from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Redux
import { createStore } from 'redux'
import {Provider, useSelector, useDispatch} from 'react-redux'
 

function reducer(currentState,action){

  const localStorage = window.localStorage

  if(currentState === undefined){
    return {
      loginToken : ''
    }
  }
  const newState = {...currentState}
  if (action.type === 'LOGOUT'){
    newState.loginToken = ''
  }
  else if(action.type === 'LOGIN'){
    newState.loginToken = localStorage.getItem('login-token')
  }
  return newState
}

const store = createStore(reducer)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
reportWebVitals();
