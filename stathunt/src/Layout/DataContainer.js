import React, {Component, Fragment} from 'react';
import DataWindow from '../DataVis/DataWindow';

export default class DataContainer extends Component{
    render(){
        return <Fragment>
            <DataWindow hidden={this.props.hidden}/>
        </Fragment>
    }
}