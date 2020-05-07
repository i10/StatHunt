import React, { Component } from 'react';
import BlocklyComponent, { Block } from './Blockly';
import Blockly from 'blockly/core';
import './blocks/customblocks';

export default class BlocklyWindow extends Component {
  constructor(props) {
    super(props);
    this.workspace = React.createRef();

    this.data = {}
    this.changes = true

    this.syncWorkspace = this.syncWorkspace.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount(){
    setInterval(() => {
      this.updateData()
      setTimeout(this.syncWorkspace, 200)
    }, 2000)
  }

  updateData(){
    fetch("http://localhost:8000/exp_design/" + localStorage.uid)
        .then((response) => {
          return response.json()
        })
        .then((response) => {
          this.data = response
        });
  }

  syncWorkspace() {
    if (Blockly.mainWorkspace.getTopBlocks().length == 0) {
      var initXml = `<xml><block type="experiment_design"></block></xml>`
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initXml), Blockly.getMainWorkspace());
    }
    console.log(this.changes)
    if(!this.changes){
      console.log("No changes")
      return
    }

    var block = this.refs.blocklyComponent.primaryWorkspace.getTopBlocks()[0]
    var goal = block.getInput('goal')
    goal.fieldRow[1].setValue(this.data['goal_of_analysis'])

    var hypothesis = block.getInput('hypothesis')
    hypothesis.fieldRow[1].setValue(this.data['hypothesis'])

    var procedure = block.getInput('procedure')
    procedure.fieldRow[1].setValue(this.data['procedure'])

    var design = block.getInput('dss')
    design.fieldRow[1].setValue(this.data['exp_design'])
    design.fieldRow[3].setValue(this.data['sample_size'])

    while(block.getInput('dependentVariables').connection.targetBlock() != null){
      block.getInput('dependentVariables').connection.targetBlock().dispose(true)
    }
    for(var i = 0; i < this.data['dv'].length; i++){
      var dvblock = this.refs.blocklyComponent.primaryWorkspace.newBlock('dependent_variable')
      dvblock.initSvg()
      dvblock.render()
      dvblock.getInput('name').fieldRow[0].setValue(this.data['dv'][i]['name'])
      dvblock.getInput('scale_of_measurement').fieldRow[1].setValue(this.data['dv'][i]['measurement'])

      block.getInput('dependentVariables').connection.connect(dvblock.previousConnection)
    }

    while(block.getInput('independentVariables').connection.targetBlock() != null){
      block.getInput('independentVariables').connection.targetBlock().dispose(true)
    }
    for(var key in this.data['iv']){
      var ivblock = this.refs.blocklyComponent.primaryWorkspace.newBlock('independent_variable')
      ivblock.initSvg()
      ivblock.render()
      ivblock.getInput('name').fieldRow[0].setValue(key)
      var ivconnection = ivblock.getInput('variables').connection

      for(var i = 0; i < this.data['iv'][key].length; i++){
        var valblock = this.refs.blocklyComponent.primaryWorkspace.newBlock('variable')
        valblock.initSvg()
        valblock.render()
        valblock.getInput('name').fieldRow[0].setValue(this.data['iv'][key][i])

        ivconnection.connect(valblock.previousConnection)
      }

      block.getInput('independentVariables').connection.connect(ivblock.previousConnection)
    }
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

// updateWorkspace(id, value) {
//   var xmlString = this.refs.blocklyComponent.getXml();
//   var addXml
//   console.log(xmlString);
//   if (xmlString.getElementsByTagName("field").length === 0) {
//     var initXml = `<xml><block type="experiment_design" id="5KnM]4+hTN|]u!f_:f03" x="47" y="34"><field name="designName">Design name</field><field name="goal">...</field><field name="hypothesis">...</field><field name="procedure">...</field><field name="BETWEENWITHIN">unknown</field><field name="participants">0</field></block></xml>`
//     Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initXml), this.refs.blocklyComponent.primaryWorkspace);
//     xmlString = this.refs.blocklyComponent.getXml();
//   }
//   if(id === "iv_values"){
//     var ivXml = xmlString.getElementsByTagName("statement")[0].children[0]
//     if (ivXml.getElementsByTagName("statement")[0] === undefined){
//       ivXml.appendChild(Blockly.Xml.textToDom('<statement name="variables"><block type="variable" id="'+value+'"><field name="NAME">'+value+'</field></block></statement>'));
//       this.refs.blocklyComponent.setXml(xmlString);
//       return;
//     }
//     var valXml = ivXml.getElementsByTagName("statement")[0].getElementsByTagName("block")[0];
//     while(valXml.getElementsByTagName("next")[0] !== undefined){
//       valXml = valXml.getElementsByTagName("next")[0].getElementsByTagName("block")[0];
//     }
//     valXml.appendChild(Blockly.Xml.textToDom('<next><block type="variable" id="'+value+'"><field name="NAME">'+value+'</field></block></next>'));
//     this.refs.blocklyComponent.setXml(xmlString);
//     return;
//   }
//   if(id === "independent_variables"){
//     addXml = Blockly.Xml.textToDom('<statement name="independentVariables"><block type="independent_variable" id="/K%Iq,g4o]t51VpkHY3="><field name="NAME">'+value+'</field><field name="INFO">...</field></block></statement>');
//     xmlString.getElementsByTagName('block')[0].appendChild(addXml);
//     this.refs.blocklyComponent.setXml(xmlString);
//     return
//   }
//   if(id === "dependent_variables"){
//     addXml = Blockly.Xml.textToDom('<statement name="dependentVariables"><block type="dependent_variable" id="'+value+'"><field name="NAME">'+value+'</field><field name="SOM">NOMINAL</field></block></statement>');
//     xmlString.getElementsByTagName('block')[0].appendChild(addXml);
//     this.refs.blocklyComponent.setXml(xmlString);
//     return
//   }
//   var fields = xmlString.getElementsByTagName("field");
//   for (var i = 0; i < fields.length; i++) {
//     if (fields[i] && fields[i].getAttributeNode("name").nodeValue === id) {
//       fields[i].innerHTML = value;
//     }
//   }
//   this.refs.blocklyComponent.setXml(xmlString);
// }