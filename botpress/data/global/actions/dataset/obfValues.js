/**
 * Sends new column values and title to server
 * @title Variable Obfuscation
 * @category Dataset
 * @author Malte Meng
 */

const axios = require('axios');

const obfValues = async () => {
    axios.post('localhost:8000/dataset/rcolumn/' + event.target, 
        {'column': temp.column_name, 'ncolumn': temp.ncolumn, 'values': temp.ncolumn_data})
        .catch(function (error) {
            console.log(error);
        })
}
return obfValues()
