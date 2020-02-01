/**
 * @license
 * 
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';

import BlocklyComponent, { Block } from './Blockly';
import {Button} from '@material-ui/core';

import './blocks/customblocks';

class App extends React.Component {
  constructor(props){
    super(props);
    this.change_workspace = this.change_workspace.bind(this);
  }
  change_workspace(){
    this.refs.child.getXml();
  }
  render() {
    return (
      <div>
        <Button onClick={this.change_workspace}>Change XML</Button>
        <header>
          <BlocklyComponent ref="child" readOnly={false} move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }} initialXml={`
              <xml xmlns="http://www.w3.org/1999/xhtml">
              <block type="experiment_design" x="30" y="30"></block>
              </xml>`
          }>
            <Block type="experiment_design" />
            <Block type="variable" />
            <Block type="independent_variable" />
            <Block type="dependent_variable" />
          </BlocklyComponent>
        </header>
      </div>
    );
  }
}

export default App;
