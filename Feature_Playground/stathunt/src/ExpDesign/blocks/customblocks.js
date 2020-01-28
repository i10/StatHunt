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
 * @fileoverview Define custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on defining blocks:
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks


import * as Blockly from 'blockly/core';

Blockly.Blocks['experiment_design'] = {
  init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("Design Name"), "designName")
          .appendField(new Blockly.FieldColour("#3333ff"), "designColor");
      this.appendDummyInput()
          .appendField("Goal")
          .appendField(new Blockly.FieldTextInput("The goal of this experiment is..."), "NAME");
      this.appendDummyInput()
          .appendField("Hypothesis")
          .appendField(new Blockly.FieldTextInput("The hypothesis...."), "NAME");
      this.appendStatementInput("independantVariables")
          .setCheck(null)
          .appendField("Independant Variables");
      this.appendStatementInput("dependantVariables")
          .setCheck(null)
          .appendField("Dependant Variables");
      this.appendDummyInput()
          .appendField("Procedure")
          .appendField(new Blockly.FieldTextInput("First take all of the ducks and add them...."), "NAME");
      this.appendDummyInput()
          .appendField("Design:")
          .appendField(new Blockly.FieldDropdown([["between-subjects","OPTIONNAME"], ["within-subjects","OPTIONNAME"], ["unknown","OPTIONNAME"]]), "NAME")
          .appendField("Participants:")
          .appendField(new Blockly.FieldNumber(0, 0), "NAME");
      this.setInputsInline(false);
      this.setColour(135);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['variable'] = {
init: function() {
  this.appendDummyInput()
      .appendField("Name:")
      .appendField(new Blockly.FieldTextInput("Name"), "name")
      .appendField("Measurement:")
      .appendField(new Blockly.FieldDropdown([["Nominal","NOMINAL"], ["Ordinal","ORDINAL"], ["Interval","INTERVAL"], ["Ratio","RATIO"]]), "SCALES");
  this.appendDummyInput()
      .appendField("Additional Info.:")
      .appendField(new Blockly.FieldTextInput("Type"), "NAME");
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setColour(230);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
