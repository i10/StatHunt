import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';

export default class NavBar extends Component{
    render(){
        return <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h5">StatHunt</Typography>
                <Button variant="contained" style={{left:'5%'}} color="secondary" onClick={this.props.onViewButtonClick}>View</Button>
            </Toolbar>
        </AppBar>
    }
}