import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import OptionsBox from './OptionsBox';
import Typography from '@material-ui/core/Typography';

export default function HitBox(props) {
    const {hit} = props;
    return (
        <>
        {
            hit && hit.name !== "webpack-scaffold-starter" ?
            <OptionsBox title={hit.name.split("-")[2].toUpperCase() + " starter"} description={hit.description} {...hit}></OptionsBox>
            :
            <>
            <br/>
            <br/>
            <Typography variant="caption" align="center">
                Want to make your own scaffold?<br />
                Get started using <a target="_blank" href="https://github.com/rishabh3112/webpack-scaffold-starter">webpack-scaffold-starter</a>
            </Typography>
            <br/>
            <br/>
            </>
        }
        </>
    )
} 