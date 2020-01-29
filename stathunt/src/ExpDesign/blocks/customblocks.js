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
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("Design Name"), "designName")
            .appendField(new Blockly.FieldColour("#3333ff"), "designColor");
        this.appendDummyInput()
            .appendField("Goal")
            .appendField(new Blockly.FieldTextInput("...."), "goal");
        this.appendDummyInput()
            .appendField("Independant Variables");
        this.appendStatementInput("independantVariables")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("Dependant Variables");
        this.appendStatementInput("dependantVariables")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("Hypothesis")
            .appendField(new Blockly.FieldTextInput("..."), "hypothesis");
        this.appendDummyInput()
            .appendField("Procedure")
            .appendField(new Blockly.FieldTextInput("..."), "NAME");
        this.appendDummyInput()
            .appendField("Design:")
            .appendField(new Blockly.FieldDropdown([["unknown", "unknown"], ["within-subjects", "within"], ["between-subjects", "between"]]), "BETWEENWITHIN")
            .appendField("Participants:")
            .appendField(new Blockly.FieldNumber(0, 0), "PARTICIPANTS");
        this.setInputsInline(false);
        this.setColour(180);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['dependant_variable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("DV Name"), "NAME");
        this.appendDummyInput()
            .appendField("Scale of Measurement")
            .appendField(new Blockly.FieldDropdown([["Nominal", "NOMINAL"], ["Ordinal", "ORDINAL"], ["Interval", "INTERVAL"], ["Ratio", "RATIO"]]), "SOM");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(200);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['independant_variable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("IV Name"), "NAME");
        this.appendStatementInput("NAME")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("Additional Info.")
            .appendField(new Blockly.FieldTextInput("..."), "INFO");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['variable'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("IV Value"), "NAME");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(140);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  