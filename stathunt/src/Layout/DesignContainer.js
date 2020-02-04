import React, {Component} from 'react';
import {BlocklyWindow} from '../ExpDesign';

export default class DesignContainer extends Component{
    constructor(props){
        super(props);

        this.updateWorkspaceXml = this.updateWorkspaceXml.bind(this);
        this.state = {}
    }

    updateWorkspaceXml(id, value){
        this.refs.blocklyWindow.updateWorkspace(id, value);
    }

    render(){
        return <div>
            <BlocklyWindow ref="blocklyWindow" />
        </div>
    }
}