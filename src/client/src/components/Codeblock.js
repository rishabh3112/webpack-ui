import React, {Component} from 'react';

// Codemirror imports
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

// Material UI components
import { Typography, Button, Paper, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Redux Store
import {connect} from 'react-redux';
import {refresh, save} from '../store/features/webpack'; 

const mapStateToProps = (state) => {
    return {
        webpack: state.webpack,
    }
};

class Codeblock extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentCode: null,
            hasChanges: false
        }
    }

    componentDidMount = async () => {
        // Find if root already have a configuration file, if so, update codeblock content
        await this.props.refresh();
        this.setState({
            currentCode: this.props.webpack
        })
    }

    save = async () => {
        await this.props.save(this.state.currentCode);
        this.setState({
            currentCode: this.props.webpack,
            hasChanges: false
        })
    }

    refresh = async () => {
        await this.props.refresh();
        this.setState({
            currentCode: this.props.webpack,
            hasChanges: false
        })
    }

    render(){
        // Render the Component
        const { classes } = this.props;
        const css = classes;

        if (this.props.webpack === null) {
            return (
                <div className='no-conf'>
                    <Typography variant='title'>
                        No webpack Configuration found!
                    </Typography>
                    <Typography variant='subtitle1'>
                        Get Started by scaffolding you project!
                    </Typography>
                </div>
            )
        }
        return (
            <Paper className={ css.codeblock }>
                <Typography className={css.filename} variant='subheading'>
                    <b>webpack.config.js</b>{this.state.hasChanges && "*"}
                </Typography>
                <Button
                    onClick = {this.save}
                    className = {css.save}
                    variant = 'text'
                > Save Changes </Button>
                <Button
                    onClick = {this.refresh}
                    className = {css.refresh}
                    variant = 'extendedFab'
                    color = 'primary'
                > Refresh </Button>
                <CodeMirror
                        value = {this.state.currentCode}
                        onBeforeChange = {
                            (editor, data, value) => {
                                this.setState({
                                    currentCode: value
                                });
                                if (this.state.currentCode !== this.props.webpack) {
                                    this.setState({
                                        hasChanges: true
                                    });
                                }
                            }
                        }
                        options = {
                            {
                                lineNumbers: true,
                                theme: 'dracula'
                            }
                        }
                ></CodeMirror>
            </Paper>
        )
    }
}

const css = (theme) => ({
    refresh: {
        display: 'block',
        position: 'absolute',
        bottom: '-20px',
        right: '10px',
        'z-index': '1'
    },
    save: {
        display: 'block',
        'margin-left': 'auto',
        'margin-right': '10px',
        color: '#22ee22'
    },
    codeblock: {
        position: 'relative',
        background: '#224488',
        height: "80%",
        'margin': '20px',
        'margin-top': "calc( 5% - 20px )",
        color: "#fff",
        padding: '0px',
    },
    filename: {
        position: 'absolute',
        top: '7px',
        left: '20px',
        color: '#fff'
    }
})

const StyledCodeBlock = withStyles(css)(Codeblock);
export default connect(mapStateToProps, {refresh, save})(StyledCodeBlock);