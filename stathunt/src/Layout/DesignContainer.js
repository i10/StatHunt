import React, {Component} from 'react';
import {BlocklyWindow} from '../ExpDesign';

export default class DesignContainer extends Component{
    render(){
        return <div style={{height:'100%'}}>
            <BlocklyWindow style={{height:'100%'}}/>
        </div>
    }
}