import React, {Component} from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

export default class Bar extends Component{
    render(){
        return <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">StatHunt</Typography>
            </Toolbar>
        </AppBar>
    }
}