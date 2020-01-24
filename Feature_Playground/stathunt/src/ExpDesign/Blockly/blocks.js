
const experimentDesignBrick = {
    name: 'experiment_design',
    category: '',
    block: {
        init() {
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
    }
}

export {experimentDesignBrick}

const variableBrick = {
    name: 'variable',
    category: '',
    block: {
        init() {
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
    }
}

export {variableBrick}