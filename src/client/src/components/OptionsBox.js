import React, { useState } from 'react';
import { Typography, Button, Link } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function OptionsBox(props) {
    const [isClicked, setIsClicked] = useState(false);
    return (
        props.title &&
        <>
        <div onClick={() => {
            setIsClicked(true)
        }} className="options-box">
            <Typography style={{pointerEvents: 'none'}} variant="subheading"><b>{props.title}</b></Typography>
            <Typography variant="caption">{props.description}</Typography>
            <div style={{marginTop: '10px'}}>
                {props.children}
            </div>
        </div>
        <Dialog
            open={isClicked}
            onClose={() => {
                setIsClicked(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <div className="scaffold-description">
                <DialogContent>
                <Typography variant="h4">
                    {props.title}
                    <Typography inline={true} variant="caption"> v.{props.version}</Typography>
                </Typography>
                <Typography variant="h6">By {props.owner? props.owner.name: "Smart pants"}</Typography>
                <br />
                <DialogContentText className="box" id="alert-dialog-description">
                    {props.description}
                    <br/>
                    <br/>
                    <hr />
                    <b>Downloads last week</b>: {props.downloadsLast30Days}
                    <br/>
                    <b>Github Repository</b>: { props.repository ? <Link href={ props.repository.url} > { props.repository.url } </Link> : "Not provided" }
                </DialogContentText>
                </DialogContent>
            </div>
            <DialogActions>
                    <Button onClick={() => {
                        setIsClicked(false);
                    }} color="primary">
                    Close
                    </Button>
                    <Button variant="raised" color="primary" href={`/#/scaffold/${props.name}`}> Create Scaffold</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}