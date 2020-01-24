import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import Blockly from 'node-blockly/browser'; 

// import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer';
// import { BlocklyWrapper } from './Blockly';
import ReactBlockly from 'react-blockly';

export default class BlocklyWindow extends Component{
  
  render(){
    return <ReactBlockly.BlocklyWorkspace>
      <ReactBlockly.BlocklyToolbox>
      </ReactBlockly.BlocklyToolbox>
    </ReactBlockly.BlocklyWorkspace>
  }
}