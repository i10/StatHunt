/**
 * Store experiment design data to the related variable
 *
 * @title Posts Variable to Backend
 * @category Dependent Variable
 * @author Malte Meng
 */

const axios = require('axios');

const postVariable = async () => {
    axios.post('http://localhost:8000/exp_design/dv', {
        user_id: event.target,
        name: user.design['dv'][temp.curr_variable-2]['name'],
        measurement: user.design['dv'][temp.curr_variable-2]['scale_of_measurement'],
        add_info: user.design['dv'][temp.curr_variable-2]['additional_info']
      })
  }
  
  return postVariable();
  