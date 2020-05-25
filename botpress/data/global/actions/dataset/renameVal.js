/**
 * Renames variable / value's
 * @title Rename Value
 * @category Dataset
 * @author Malte Meng
 * @param {str} title - Renaming a title
 * @param {str} new_name - New value
 */

const axios = require('axios');

const saveColumn = async (title, new_name) => {
    change_title = title === 'true'
    if(change_title){
        temp.ncolumn = new_name
    }else {
        temp.ncolumn_data.push(new_name)
    }
    if(temp.column_data.length === 0){
        temp.renaming = false
        return
    }
    console.log(temp)
    temp.curr_val = temp.column_data[0]
    temp.column_data = temp.column_data.slice(1)

}

return saveColumn(args.title, args.new_name)
