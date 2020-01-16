import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Blockly from 'node-blockly/browser'; 

import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer';

const helloWorld =  {
  name: 'HelloWorld',
  category: 'Demo',
  block: {
    init: function () {
      this.jsonInit({
        message0: 'Hello %1',
        args0: [
          {
            type: 'field_input',
            name: 'NAME',
            check: 'String',
          },
        ],
        output: 'String',
        colour: 160,
        tooltip: 'Says Hello',
      });
    },
  }
};

export default class BlocklyWindow extends Component{

  render(){
      return <BlocklyDrawer
      style={{height:'95%'}}
      tools={[helloWorld]}
      onChange={(code, workspace) => {
        console.log(code, workspace);
      }}
      appearance={
        {
          categories: {
            Demo: {
              colour: '270',
            },
          },
        }
      }
    >
      <Category name="Variables" custom="VARIABLE" />
      <Category name="Values">
        <Block type="math_number" />
        <Block type="text" />
      </Category>
    </BlocklyDrawer>
  }
}