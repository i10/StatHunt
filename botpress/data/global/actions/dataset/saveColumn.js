/**
 * Gets column value data and saves them into temp
 * @title Save Column
 * @category Dataset
 * @author Malte Meng
 * @param {str} column - Column name
 */

const axios = require('axios');

const saveColumn = async (column) => {
    axios.get('localhost:8000/dataset/column/' + event.target, {
        params: {
            'column': column
        }
      })
        .then(function (response) {
            temp.column_data = (response.data.values);
        })
        .catch(function (error) {
            console.log(error);
        })
    temp.column_name = column
    temp.ncolumn_data = []
    temp.renaming = true
    console.log(temp)
}

return saveColumn(args.column)
