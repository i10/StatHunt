/**
 * Store experiment design data to the related variable
 *
 * @title Posts Independent Variable
 * @category Independent Variable
 * @author Malte Meng
 */

const axios = require('axios');

const postVariable = async () => {
    console.log(user.design['iv'])
    axios.post('localhost:8000/exp_design/iv', {
        user_id: event.target,
        name: user.design['iv'][temp.curr_fact-2]['name'],
        levels: user.design['iv'][temp.curr_fact-2]['levels'],
      })
  }
  
  return postVariable();
  