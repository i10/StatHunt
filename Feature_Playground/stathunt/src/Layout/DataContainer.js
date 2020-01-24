import React, {Component, Fragment} from 'react';
import {Paper} from '@material-ui/core';
import DataWindow from '../DataVis/DataWindow';

export default class DataContainer extends Component{
    render(){
        return <Fragment>
            <DataWindow />
        </Fragment>
    }
}