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
          <xml xmlns="https://developers.google.com/blockly/xml" id="workspaceBlocks" style="display: none">
          <block type="experiment_design" id="1,6jgXUgt$ThPj~1X%Q-" x="40" y="40">
            <field name="designName">Design name</field>
            <field name="designColor">#3333ff</field>
            <field name="goal">....</field>
            <field name="hypothesis">...</field>
            <field name="NAME">...</field>
            <field name="BETWEENWITHIN">unknown</field>
            <field name="PARTICIPANTS">0</field>
            <statement name="independentVariables">
              <block type="independent_variable" id="}Aqb8R$H[C5GhlRO*$06">
                <field name="NAME">Variable name</field>
                <field name="INFO">...</field>
                <statement name="NAME">
                  <block type="variable" id="g!*}vJkQrA(tJI]xzTK4">
                    <field name="NAME">Name</field>
                    <next>
                      <block type="variable" id="|[MC6yf(xTwtYxGLF~X+">
                        <field name="NAME">Name</field>
                      </block>
                    </next>
                  </block>
                </statement>
              </block>
            </statement>
            <statement name="dependentVariables">
              <block type="dependent_variable" id="4ohu*#5Yz24dZ}5gc,eK">
                <field name="NAME">Variable name</field>
                <field name="SOM">NOMINAL</field>
              </block>
            </statement>
          </block>
        </xml>`
          }>
            <Block type="experiment_design" />
            <Block type="independent_variable"/>
            <Block type="variable" />
            <Block type="dependent_variable" />
          </BlocklyComponent>
        </header>
      </div>
    );
  }
}
