import React, {Component, Fragment} from 'react';
import BlocklyComponent from './Blockly/BlocklyComponent';
import {Block, Category, Value, Field, Shadow} from './Blockly';

export default class BlocklyWindow extends Component{
    render(){
        return <Fragment>
            <BlocklyComponent ref={e => this.simpleWorkspace = e} readOnly={false} move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }} initialXml={`
<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="controls_ifelse" x="0" y="0"></block>
</xml>
      `}>
            <Block type="controls_ifelse"/>
          </BlocklyComponent>
        </Fragment>;
    }
}