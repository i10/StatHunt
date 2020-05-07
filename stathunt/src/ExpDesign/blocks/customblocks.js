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
        this.appendDummyInput("name")
            .appendField(new Blockly.FieldTextInput("Design name"), "input")
        this.appendDummyInput("goal")
            .appendField("Goal")
            .appendField(new Blockly.FieldTextInput("...."), "input");
        this.appendDummyInput()
            .appendField("Independent variables");
        this.appendStatementInput("independentVariables")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("Dependent variables");
        this.appendStatementInput("dependentVariables")
            .setCheck(null);
        this.appendDummyInput("hypothesis")
            .appendField("Hypothesis")
            .appendField(new Blockly.FieldTextInput("..."), "input");
        this.appendDummyInput("procedure")
            .appendField("Procedure")
            .appendField(new Blockly.FieldTextInput("..."), "input");
        this.appendDummyInput('dss')
            .appendField("Design:")
            .appendField(new Blockly.FieldDropdown([["unknown", "unknown"], ["within-subjects", "within"], ["between-subjects", "between"]]), "BETWEENWITHIN")
            .appendField("Participants:")
            .appendField(new Blockly.FieldNumber(0, 0), "participants");
        this.setInputsInline(false);
        this.setColour(120);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['dependent_variable'] = {
    init: function () {
        this.appendDummyInput("name")
            .appendField(new Blockly.FieldTextInput("DV name"), "NAME");
        this.appendDummyInput("scale_of_measurement")
            .appendField("Scale of measurement")
            .appendField(new Blockly.FieldDropdown([["nominal", "NOMINAL"], ["ordinal", "ORDINAL"], ["interval", "INTERVAL"], ["ratio", "RATIO"]]), "SOM");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['independent_variable'] = {
    init: function () {
        this.appendDummyInput("name")
            .appendField(new Blockly.FieldTextInput("IV name"), "NAME");
        this.appendStatementInput("variables")
            .setCheck(null);
        this.appendDummyInput("add_info")
            .appendField("Additional info.")
            .appendField(new Blockly.FieldTextInput("..."), "INFO");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['variable'] = {
    init: function() {
      this.appendDummyInput("name")
          .appendField(new Blockly.FieldTextInput("IV value"), "NAME");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  