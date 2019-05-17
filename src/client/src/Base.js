import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom"

// Store
import {scaffold, refresh} from './store/features/webpack';
import { connect } from 'react-redux';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from "@material-ui/core/Switch";
import EditIcon from "@material-ui/icons/edit";
import { withStyles } from '@material-ui/core/styles';

// Components 
import Codeblock from "./components/Codeblock";
import {Home} from "./pages/Home";

class BaseDashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showEditor: false,
            isToggling: false,
        }
    }

    toggleEditor = () => {
        this.setState({
            isToggling: true,
        });
        this.setState(old => ({
            showEditor: !old.showEditor
        }));
        setTimeout(()=>{
            this.setState({
                isToggling: false,
            })
        }, 500);
    }
    componentDidMount = async () => {
        await this.props.refresh();
    }

    render() {
        const {classes} = this.props;
        return (
            <Router>
                <div className="App">
                    <span className = {classes.toggle}>
                        <EditIcon className={classes.editIcon} />
                        <Switch
                            checked={this.state.showEditor}
                            onChange={this.toggleEditor}
                            color="primary"
                        />
                    </span>

                    <Typography variant="h5" className="page-title">
                        Dashboard
                    </Typography>
                    
                    <Grid className={classes.maingrid} container spacing={0}>
                        <Grid item xs={
                            (this.state.showEditor || this.state.isToggling) ? 4: 12
                        } className={classes.appsection}>
                            <Route exact path="/" render={
                                (props) => {
                                    return <Home {...{...props,...this.props}} />
                                }
                            } />
                        </Grid>
                        {
                            (this.state.showEditor || this.state.isToggling) &&
                            <Grid item xs={8} className={this.state.isToggling&&(this.state.showEditor?'slideIn':'slideOut')}>
                                <Codeblock/>
                            </Grid>
                        }
                    </Grid>
                </div>
            </Router>
        );
    }
}

const styles = (theme) => ({
    appsection: {
        'margin-bottom': "-20px",
        backgroundColor: "#ffffff",
        height: "100%",
        "overflow-y": "scroll"
    },
    maingrid: {
        height: "calc(100% - 50px)",
    },
    toggle: {
        "float": "right",
        border: "2px solid #eeeeee",
        "height": "50px",
        "border-radius": "25px 0pc 0pc 25px",
        background: "#263238",
        color: "#ffffff",
        "padding-left": "20px",
        margin: "0px -2px 0px 0px"
    },
    editIcon: {
        "transform": "translateY(5px);"
    }
})

const mapStateToProps = (state) => {
    return {
        webpack: state.webpack,
    }
};

export const Base = connect(
    mapStateToProps, 
    {scaffold, refresh}
)(withStyles(styles)(BaseDashboard));