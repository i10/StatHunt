import React, {Component} from 'react';
import { Paper } from '@material-ui/core';
import {BlocklyWindow} from '../ExpDesign';

export default class DesignContainer extends Component{
    render(){
        return <Paper variant="outlined" style={{height:'100%'}}>
            <BlocklyWindow style={{height:'100%'}}/>
        </Paper>
    }
}