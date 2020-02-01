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
    var addXml
    console.log(xmlString);
    if (xmlString.getElementsByTagName("field").length === 0) {
      var initXml = `<xml><block type="experiment_design" id="5KnM]4+hTN|]u!f_:f03" x="47" y="34"><field name="designName">Design name</field><field name="goal">...</field><field name="hypothesis">...</field><field name="procedure">...</field><field name="BETWEENWITHIN">unknown</field><field name="participants">0</field></block></xml>`
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initXml), this.refs.blocklyComponent.primaryWorkspace);
      xmlString = this.refs.blocklyComponent.getXml();
    }
    if(id === "iv_values"){
      var ivXml = xmlString.getElementsByTagName("statement")[0].children[0]
      if (ivXml.getElementsByTagName("statement")[0] === undefined){
        ivXml.appendChild(Blockly.Xml.textToDom('<statement name="variables"><block type="variable" id="'+value+'"><field name="NAME">'+value+'</field></block></statement>'));
        this.refs.blocklyComponent.setXml(xmlString);
        return;
      }
      var valXml = ivXml.getElementsByTagName("statement")[0].getElementsByTagName("block")[0];
      while(valXml.getElementsByTagName("next")[0] !== undefined){
        valXml = valXml.getElementsByTagName("next")[0].getElementsByTagName("block")[0];
      }
      valXml.appendChild(Blockly.Xml.textToDom('<next><block type="variable" id="'+value+'"><field name="NAME">'+value+'</field></block></next>'));
      // xmlString.getElementsByTagName("statement")[0].children[0].getElementsByTagName("statement")[0].appendChild(addXml);
      this.refs.blocklyComponent.setXml(xmlString);
      return;
    }
    if(id === "independent_variables"){
      addXml = Blockly.Xml.textToDom('<statement name="independentVariables"><block type="independent_variable" id="/K%Iq,g4o]t51VpkHY3="><field name="NAME">'+value+'</field><field name="INFO">...</field></block></statement>');
      xmlString.getElementsByTagName('block')[0].appendChild(addXml);
      this.refs.blocklyComponent.setXml(xmlString);
      return
    }
    if(id === "dependent_variables"){
      addXml = Blockly.Xml.textToDom('<statement name="dependentVariables"><block type="dependent_variable" id="'+value+'"><field name="NAME">'+value+'</field><field name="SOM">NOMINAL</field></block></statement>');
      xmlString.getElementsByTagName('block')[0].appendChild(addXml);
      this.refs.blocklyComponent.setXml(xmlString);
      return
    }
    var fields = xmlString.getElementsByTagName("field");
    for (var i = 0; i < fields.length; i++) {
      if (fields[i] && fields[i].getAttributeNode("name").nodeValue === id) {
        fields[i].innerHTML = value;
      }
    }
    this.refs.blocklyComponent.setXml(xmlString);
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
