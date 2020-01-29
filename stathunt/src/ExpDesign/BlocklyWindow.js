import React, { Component } from 'react';
import BlocklyComponent, { Block } from './Blockly';
import './blocks/customblocks';

export default class BlocklyWindow extends Component {

  render() {
    return (
      <div>
        <header>
          <BlocklyComponent ref={e => this.simpleWorkspace = e} readOnly={false} move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }} initialXml={`
              <xml xmlns="http://www.w3.org/1999/xhtml">
              <block type="experiment_design" x="30" y="30"></block>
              </xml>`
          }>
            <Block type="experiment_design" />
            <Block type="independant_variable"/>
            <Block type="variable" />
            <Block type="dependant_variable" />
          </BlocklyComponent>
        </header>
      </div>
    );
  }
}
