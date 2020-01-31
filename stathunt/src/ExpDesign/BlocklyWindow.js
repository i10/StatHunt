import React, { Component } from 'react';
import BlocklyComponent, { Block } from './Blockly';
import Blockly from 'blockly/core';
import './blocks/customblocks';

export default class BlocklyWindow extends Component {
  constructor(props) {
    super(props);
    this.workspace = React.createRef();

    this.updateWorkspace = this.updateWorkspace.bind(this);
  }

  updateWorkspace(id, value) {
    var xmlString = this.refs.blocklyComponent.getXml();
    if (xmlString.getElementsByTagName("field").length === 0) {
      var initXml = `<xml><block type="experiment_design" id="5KnM]4+hTN|]u!f_:f03" x="47" y="34"><field name="designName">Design name</field><field name="goal">...</field><field name="hypothesis">...</field><field name="procedure">...</field><field name="BETWEENWITHIN">unknown</field><field name="participants">0</field><statement name="independentVariables"><block type="independent_variable" id="2:YN+A;c^ft~f/~pWuS"><field name="NAME">IV name</field><field name="INFO">...</field><statement name="NAME"><block type="variable" id="%+;/ds|+db}:7u4J}7My"><field name="NAME">IV value</field><next><block type="variable" id="~8$nFgfiqx8:yVcyrYTN"><field name="NAME">IV value</field></block></next></block></statement></block></statement><statement name="dependentVariables"><block type="dependent_variable" id="o}L%w3]60sD.]EDdGDI"><field name="NAME">DV name</field><field name="SOM">NOMINAL</field></block></statement></block></xml>`
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initXml), this.refs.blocklyComponent.primaryWorkspace);
      console.log(xmlString);
      xmlString = this.refs.blocklyComponent.getXml();
    }
    if (id === "independent_variables") {
      var newEl = xmlString.createElement(`statement`);
      newEl.setAttribute('name', 'independentVariables');
      newEl.innerHTML = `<block type="independent_variable"><field name="NAME">` + value + `</field><field name="INFO">...</field></block>`;
      console.log(newEl);
      this.refs.blocklyComponent.setXml(xmlString)
      return;
    }
    var fields = xmlString.getElementsByTagName("field");
    for (var i = 0; i < fields.length; i++) {
      if (fields[i] && fields[i].getAttributeNode("name").nodeValue === id) {
        fields[i].innerHTML = value;
      }
    }
    this.refs.blocklyComponent.setXml(xmlString)
    console.log(xmlString)
  }

  render() {
    return (
      <div>
        <header>
          <BlocklyComponent ref="blocklyComponent" readOnly={false} move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }} initialXml={``}>
            <Block type="experiment_design" />
            <Block type="independent_variable" />
            <Block type="variable" />
            <Block type="dependent_variable" />
          </BlocklyComponent>
        </header>
      </div>
    );
  }
}
