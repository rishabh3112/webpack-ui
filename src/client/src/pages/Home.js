import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';
import OptionsBox from '../components/OptionsBox';
export function Home(props) {
    useEffect(() => {
        props.setTitle("Dashboard")
    },[])
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
            <>
                <Typography variant="headline">Create new project</Typography>
                <OptionsBox title="Empty Project" description="create an empty project barebone webpack setup">
                    <Button onClick={() => {props.scaffold()}} variant="contained" color="primary">Create</Button>
                </OptionsBox>

                <Divider />
                <OptionsBox title="PWA starter" description="Kickstart your PWA development with perfect lighthouse score out of the box">
                    <Link to="/scaffold/webpack-scaffold-pwa">
                        <Button variant="contained" color="primary">Create</Button>
                    </Link>
                </OptionsBox>
                <OptionsBox title="Vue starter" description="Kickstart your project on vue with everything setup out of the box">
                    <Link to="/scaffold/webpack-scaffold-vue">
                        <Button variant="contained" color="primary">Create</Button>
                    </Link>
                </OptionsBox>
            </>
        }
        </div>
        </>
    )
}