import React, { Component} from "react";
import ReactDOM from "react-dom";
import 'babel-polyfill';
import store from './store';
import {scaffold} from './store/features/webpack';
import { connect, Provider } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import "./App.css";
import Codeblock from "./components/Codeblock";

const styles = (theme) => ({
    appsection: {
        'margin-bottom': "-20px",
        backgroundColor: "#ffffff",
    },
    maingrid: {
        height: "100%"
    }
})

class App extends Component{
  constructor(props){
      super(props);
  }

  render(){
    const { classes } = this.props;
    return(
      <div className="App">
       <Grid className={classes.maingrid} container spacing={0}>
            <Grid item xs={4} className={classes.appsection}>

                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            webpack UI
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className="pad-section">

                    <Typography variant="subtitle1" color="inherit">
                        Scaffold new project by one click!!
                    </Typography>

                    <Button onClick={() => {this.props.scaffold()}} variant="contained" color="primary">Scaffold Defaults</Button>

                </div>
            </Grid>
            <Grid item xs={8}>
                <Codeblock/>
            </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        webpack: state.webpack,
    }
};

const StyledApp = connect(mapStateToProps, {scaffold})(withStyles(styles)(App));
ReactDOM.render(
    <Provider store={store}>
        <StyledApp/>
    </Provider>,
    document.getElementById("root")
);

if (module.hot) {
    module.hot.accept();
}