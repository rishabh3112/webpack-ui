import React, { Component} from "react";
import ReactDOM from "react-dom";

import { Banner } from "./components/Banner";
import { Base } from "./Base";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

import store from './store';
import { Provider } from 'react-redux';

import 'babel-polyfill';
import "./App.css";
import { StatusBar } from "./components/StatusBar";

const THEME = createMuiTheme({
    typography: {
        fontFamily: "'Fira Sans', sans-serif"
    }
})

class App extends Component{
  constructor(props){
      super(props);
  }

  render(){
    return(
        <MuiThemeProvider theme={THEME}>
        <>
            <Base />
            <StatusBar />
        </>
        </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

if (module.hot) {
    module.hot.accept();
}