import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, Button, ButtonGroup} from '@material-ui/core';

export default class NavBar extends Component{
    render(){
        const l_padding = '837px'
        return <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h4">StatHunt</Typography>
                <ButtonGroup style={{padding:'10px'}} variant="outlined" color="secondary">
                    <Button style={{left: l_padding}} onClick={this.props.onViewButtonClick}>Experimental Design</Button>
                    <Button style={{left: l_padding}}>Dataset</Button>
                    <Button style={{left: l_padding}}>Questions</Button>
                </ButtonGroup>
            </Toolbar>
        </AppBar>
    }
}