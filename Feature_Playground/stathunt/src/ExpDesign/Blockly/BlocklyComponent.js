import Blockly from 'blockly/core';
import 'blockly/blocks';
import React, {Component, Fragment} from 'react';
import locale from 'blockly/msg/en';

Blockly.setLocale(locale);

export default class BlocklyComponent extends Component{
    componentDidMount(){
        const {initialXml, children, ...rest} = this.props;
        this.primaryWorkspace = Blockly.inject(
            this.blocklyDiv,
            {toolbox: this.toolbox,
            ...rest},
        );
        if (initialXml){
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml),this.primaryWorkspace);
        }
    }

    get workspace() {
        return this.primaryWorkspace;
    }

    setXml(xml) {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this.primaryWorkspace);
    }

    render() {
        const {children} = this.props;

        return <Fragment >
            <div ref={e => this.blocklyDiv = e} id ="blocklyDiv" style={{height:'100%', width:'100%'}}/>
            <xml xmlns="https://developers.google.com/blockly/xml" is="blockly" style={{ display: 'none' }} ref={(toolbox) => { this.toolbox = toolbox; }}>
                {children}
            </xml>
        </Fragment>
    }
}