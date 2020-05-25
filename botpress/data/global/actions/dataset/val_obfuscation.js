/**
 * Store experiment design data to the related variable
 *
 * @title Value Obfuscation
 * @category Dataset
 * @author Malte Meng
 * @param {string} column - Pick between the column names of dependent variables
 */

const axios = require('axios');

const val_obfuscation = async (column) => {
    axios.post('http://78.46.171.75:8000/dataset/obfuscate/' + event.target, null, {
        params: {
            'column': column
        }
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }
  
  return val_obfuscation(args.column)
