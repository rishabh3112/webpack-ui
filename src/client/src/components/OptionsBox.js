import React from 'react';
import { Typography } from '@material-ui/core';
export default function OptionsBox(props) {
    return (
        props.title &&
        <div className="options-box">
            <Typography variant="subheading"><b>{props.title}</b></Typography>
            <Typography style={{height: "50px", overflowY:"auto"}} variant="caption">{props.description}</Typography>
            <div style={{marginTop: '10px'}}>
                {props.children}
            </div>
        </div>
    )
}