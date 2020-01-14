import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';

export default class Bar extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h5">StatHunt</Typography>
                <Button variant="contained" color="secondary" onClick={this.props.onViewButtonClick}>View</Button>
            </Toolbar>
        </AppBar>
    }
}