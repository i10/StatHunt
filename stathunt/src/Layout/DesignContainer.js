import React, {Component} from 'react';
import {BlocklyWindow} from '../ExpDesign';

export default class DesignContainer extends Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return <div>
            <BlocklyWindow />
        </div>
    }
}