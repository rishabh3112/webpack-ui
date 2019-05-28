import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import OptionsBox from './OptionsBox';

export default function HitBox(props) {
    const {hit} = props;
    return (
        <>
        {
            hit && hit.name !== "webpack-scaffold-starter" &&
            <OptionsBox title={hit.name.split("-")[2].toUpperCase() + " starter"} description={hit.description}>
                <Link to={`/scaffold/${hit.name}`}>
                    <Button variant="contained" color="primary">Create</Button>
                </Link>
            </OptionsBox>
        }
        </>
    )
} 