import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export function Home(props) {
    return (
        <div className="pad-section">
        {
            props.webpack &&
            <div className="pad-section">
                <div className="grey-card">
                    <Typography variant="headline">
                        Project Found !
                    </Typography>
                    <Typography variant="subtitle1" color="inherit">
                        Start editing configuration on Editor
                    </Typography>
                </div>
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
    )
}