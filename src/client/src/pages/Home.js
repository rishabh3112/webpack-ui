import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Configure,
} from 'react-instantsearch-dom';

import {Link} from 'react-router-dom';
import OptionsBox from '../components/OptionsBox';
import HitBox from '../components/HitBox';
const searchClient = algoliasearch(
    'OFCNCOG2CU',
    '77db8c6516725ef60b8a60223155f7ad'
);

export function Home(props) {
    useEffect(() => {
        props.setTitle("Dashboard")
    },[])
    return (
        <>
        {
            props.webpack &&
            <>
                <img id="ban-img" src="/assets/group.png" alt="background" />
                <div className="section-banner">
                    <Typography align="center" variant="h4">
                        Project Manager
                    </Typography>
                </div>
                <br/>
                <br/>
                <Typography align="center" variant="subtitle1" color="inherit">
                    Start editing configuration on Editor <EditIcon />
                </Typography>
                <Typography align="center" variant="subtitle1" color="inherit">
                    Build your project from the taskbar below
                </Typography>
            </>
        }
        {
            !props.webpack &&
            <>
            <InstantSearch searchClient={searchClient} indexName="npm-search">
                    <img id="ban-img" src="/assets/group.png" alt="background" />
                    <div className="section-banner">
                        <Typography align="center" variant="h4">webpack UI</Typography>
                        <Typography align="center" variant="body2">Create a new project from these awesome starters.</Typography>
                    <SearchBox translations = {{
                        placeholder: 'Search here'
                    }}/>
                    </div>
                    {/* <Fab variant="extended" color="secondary" style={{float: "right", top: "-29px", marginRight: "20px"}} onClick={() => {props.scaffold()}}>
                        <AddIcon /> Empty Project
                    </Fab> */}
                    <div className="pad-section">
                        <Configure
                            filters="computedKeywords:webpack-scaffold"
                            hitsPerPage={16}
                            analyticsTags={['webpack-scaffold']}
                        />
                        <Hits hitComponent={HitBox} />
                    </div>
                </InstantSearch>
                <br/>
                <br/>
            </>
        }
        </>
    )
}