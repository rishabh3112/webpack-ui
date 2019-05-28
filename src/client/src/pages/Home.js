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
            <div className="section-banner">
                <Typography align="center" variant="h4">
                    Project Found !
                </Typography>
                <Typography align="center" variant="subtitle1" color="inherit">
                    Start editing configuration on Editor <EditIcon />
                </Typography>
            </div>
        }
        {
            !props.webpack &&
            <>
            <InstantSearch searchClient={searchClient} indexName="npm-search">
                    <div className="section-banner">
                    <Typography align="center" variant="h4">Project Starters</Typography>
                    <SearchBox/>
                    </div>
                    <Fab variant="extended" color="secondary" style={{float: "right", top: "-29px", marginRight: "20px"}} onClick={() => {props.scaffold()}}>
                        <AddIcon /> Empty Project
                    </Fab>
                    <div className="pad-section">
                        <Configure
                            filters="computedKeywords:webpack-scaffold"
                            hitsPerPage={16}
                            analyticsTags={['webpack-scaffold']}
                        />
                        <Hits hitComponent={HitBox} />
                    </div>
                </InstantSearch>
                <br />
                <Typography variant="caption" align="center">
                    Search powered by algolia <br/>
                    Want to make your own scaffold?<br />
                    Get started using <a target="_blank" href="https://github.com/rishabh3112/webpack-scaffold-starter">webpack-scaffold-starter</a>
                </Typography>
            </>
        }
        </>
    )
}