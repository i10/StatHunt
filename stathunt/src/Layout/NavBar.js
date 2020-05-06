import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, } from '@material-ui/core';
import NavigationStepper from './NavigationStepper';


export default class NavBar extends Component {
    render() {
        return <React.Fragment>
            <AppBar color='secondary' position="fixed">
                <Toolbar>
                    <Typography color='primary.contrastText' variant="h4" style={{ flex: 1 }}>StatHunt</Typography>
                    <NavigationStepper style={{background: '#05e297'}}/>
                </Toolbar> 
            </AppBar>
            <Toolbar />
        </React.Fragment>
    }
}