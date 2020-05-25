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
    this.sendDesignData = this.sendDesignData.bind(this);
  }

  componentDidMount() {
    fetch("http://78.46.171.75:8000/exp_design/" + localStorage.uid)
            .then((response) => {
              return response.json()
            })
            .then((response) => {
              this.data = response
              this.syncWorkspace()
            });
          
    window.myInterval = setInterval(() => {
      this.updateData()
    }, 500)
  }

  componentWillUnmount(){
    clearInterval(window.myInterval) 
  }
  // Pulls data from server if chatbot has provided information, posts blockly data otherwise
  updateData() {
    if(this.props.hidden){
      return
    }
    fetch("http://78.46.171.75:8000/update/" + localStorage.uid)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response) {
          fetch("http://78.46.171.75:8000/exp_design/" + localStorage.uid)
            .then((response) => {
              return response.json()
            })
            .then((response) => {
              this.data = response
              this.syncWorkspace()
            });
        }else{
          this.sendDesignData()
        }
      })


  }

  // Parses main design block and sends data to be stored on the server
  sendDesignData() {
    var block = this.refs.blocklyComponent.primaryWorkspace.getTopBlocks()[0]

    if (block === undefined) {
      this.syncWorkspace()
      block = this.refs.blocklyComponent.primaryWorkspace.getTopBlocks()[0]
    }

    var data = {}

    data['hypothesis'] = block.getInput('hypothesis').fieldRow[1].getValue()
    data['goal_of_analysis'] = block.getInput('goal').fieldRow[1].getValue()
    data['procedure'] = block.getInput('procedure').fieldRow[1].getValue()
    data['sample_size'] = block.getInput('dss').fieldRow[3].getValue()
    data['exp_design'] = block.getInput('dss').fieldRow[1].getValue()

    var dv = []
    var conn = block.getInput('dependentVariables').connection
    var name
    while (conn.targetBlock() != null) {
      name = conn.targetBlock().getInput('name').fieldRow[0].getValue()
      var measurement = conn.targetBlock().getInput('scale_of_measurement').fieldRow[1].getValue()
      dv.push({ 'name': name, 'measurement': measurement })
      conn = conn.targetBlock().nextConnection
    }
    data['dv'] = dv

    var iv = []
    conn = block.getInput('independentVariables').connection
    while (conn.targetBlock() != null) {
      name = conn.targetBlock().getInput('name').fieldRow[0].getValue()
      var levels = []
      var vconn = conn.targetBlock().getInput('variables').connection
      while (vconn.targetBlock() != null) {
        levels.push(vconn.targetBlock().getInput('name').fieldRow[0].getValue())
        vconn = vconn.targetBlock().nextConnection
      }
      iv.push({ 'name': name, 'levels': levels })
      conn = conn.targetBlock().nextConnection
    }
    data['iv'] = iv
    this.data = data
    fetch('http://78.46.171.75:8000/post_design/' + localStorage.uid, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }

  // Renders main design block based on information stored in this.data
  syncWorkspace() {
    if (this.refs.blocklyComponent.primaryWorkspace.getTopBlocks().length === 0) {
      var initXml = `<xml><block type="experiment_design"></block></xml>`
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initXml), Blockly.getMainWorkspace());
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
    while (block.getInput('dependentVariables').connection.targetBlock() != null) {
      block.getInput('dependentVariables').connection.targetBlock().dispose(true)
    }
    for (var i = 0; i < this.data['dv'].length; i++) {
      var dvblock = this.refs.blocklyComponent.primaryWorkspace.newBlock('dependent_variable')
      dvblock.initSvg()
      dvblock.render()
      dvblock.getInput('name').fieldRow[0].setValue(this.data['dv'][i]['name'])
      dvblock.getInput('scale_of_measurement').fieldRow[1].setValue(this.data['dv'][i]['measurement'])

      block.getInput('dependentVariables').connection.connect(dvblock.previousConnection)
    }

    while (block.getInput('independentVariables').connection.targetBlock() != null) {
      block.getInput('independentVariables').connection.targetBlock().dispose(true)
    }
    for (i = 0; i < this.data['iv'].length; i++) {
      var ivblock = this.refs.blocklyComponent.primaryWorkspace.newBlock('independent_variable')
      ivblock.initSvg()
      ivblock.render()
      ivblock.getInput('name').fieldRow[0].setValue(this.data['iv'][i]['name'])
      var ivconnection = ivblock.getInput('variables').connection

      for (var j = 0; j < this.data['iv'][i]['levels'].length; j++) {
        var valblock = this.refs.blocklyComponent.primaryWorkspace.newBlock('variable')
        valblock.initSvg()
        valblock.render()
        valblock.getInput('name').fieldRow[0].setValue(this.data['iv'][i]['levels'][j])

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