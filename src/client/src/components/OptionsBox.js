import React from 'react';
import { Typography } from '@material-ui/core';
export default function OptionsBox(props) {
    return (
        <div className="options-box">
            <Typography variant="subheading">{props.title}</Typography>
            <Typography style={{height: "50px", overflowY:"scroll"}} variant="caption">{props.description}</Typography>
            <div style={{marginTop: '10px'}}>
                {props.children}
            </div>
        </div>
    )
}