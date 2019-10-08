import React, {useState} from 'react';

import { Typography, Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {request} from '../store/features/webpack';

import BuildIcon from '@material-ui/icons/Build';
import MessageIcon from '@material-ui/icons/Warning';

export function StatusBar(props) {
    const [isRunning, setIsRunning] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [task, setTask] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLog, setIsLog] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const build = async () => {
        setIsClicked(true);
        setIsRunning(true);
        setTask("Build")
    
        const res = await request('/api/npm', {command: 'build'});
        if (res.value === true) {
            await setTimeout(() => {
                setMessage('Build Completed!');
            }, 2000);
            setIsRunning(false);
            setIsError(false);
        } else {
            setErrorMessage(
`BUILD error #${Date.now()}
--------------------------------
${res.value}
`
            );
            setIsRunning(false);
            setIsError(true);
        }
    }

    return (
        <>
            <div className={
                [
                    isRunning ? "blue" : (isError ? "red" : (isClicked?"green":"blue")),
                    "status-bar"
                ].join(' ')
            } >
                <Typography inline={true} variant="body2" color="inherit">
                <div className="tasks">
                    Tasks
                    <BuildIcon onClick={async () => await build()} className="status-button"/>
                    <MessageIcon onClick={() => {
                        setIsLog(true);
                    }} className="status-button" />
                </div>
                    <b class="status-message">
                    {
                        isRunning?`Running ${task}`:(
                            isError?`${task} Failed`:(
                                isClicked?`${task} Successful`:``
                        ))
                    }
                    </b>
                </Typography>
                {
                    false &&
                    <span style={{float: "right"}}><Typography inline={true} align="right" variant="body2"> About </Typography></span>
                }
            </div>
            

            <Dialog
            open={isError || isLog}
            onClose={() => {
                setIsError(false);
                setIsClicked(false);
                setIsLog(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Error Log"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <pre>
                    {errorMessage}
                </pre>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setIsError(false);
                    setIsClicked(false);
                    setIsLog(false);
                }} color="primary">
                Close
                </Button>
            </DialogActions>
            </Dialog>
        </>
    );
}