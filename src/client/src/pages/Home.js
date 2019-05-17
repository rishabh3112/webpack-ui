import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {request} from '../store/features/webpack';
import BuildIcon from '@material-ui/icons/build';
export function Home(props) {

    const [isBuilding, setIsBuilding] = useState(false);
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const build = async () => {
        setIsClicked(true);
        setIsBuilding(true);
        setMessage('Building...');

        const res = await request('/api/npm', {command: 'build'});
        if (res.value === true) {
            await setTimeout(() => {
                setMessage('Build Completed!');
            }, 2000);
            setIsBuilding(false);
            setIsError(false);
            setMessage('');
        } else {
            setMessage(
                `${res.value}`
            );
            setIsBuilding(false);
            setIsError(true);
        }
    }
    return (
        <>
        <div className="pad-section">
        {
            props.webpack &&
            <div className="grey-card">
                <Typography variant="headline">
                    Project Found !
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                    Start editing configuration on Editor
                </Typography>
            </div>
        }
        {
            !props.webpack &&
                <div className="grey-card">
                    <Typography variant="headline">
                        Create New Project
                    </Typography>
                    <Typography variant="subtitle1" color="inherit">
                        Scaffold new project by one click!!
                    </Typography>

                    <Button onClick={() => {props.scaffold()}} variant="contained" color="primary">Create Project</Button>
                </div>
        }
        </div>
        
        <div className={
            [
                isBuilding ? "blue" : (isError ? "red" : (isClicked?"green":"blue")),
                "status-bar"
            ].join(' ')
        } >
            <Typography variant="body2" color="inherit">
            <div className="tasks">
                Tasks
                <IconButton className="status-button" onClick={async () => await build()}>
                    <BuildIcon className="status-button"/>
                </IconButton>
            </div>
                <b class="status-message">
                {
                    isBuilding?"Running Build":(
                        isError?"Build Failed":(
                            isClicked?"Build Successful":""
                    ))
                }
                </b>
            </Typography>
        </div>
        <Dialog
          open={isError}
          onClose={() => {
              setIsError(false);
              setIsClicked(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Build Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <pre>
                {message}
              </pre>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
                setIsError(false);
                setIsClicked(false);
            }} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        </>
    )
}