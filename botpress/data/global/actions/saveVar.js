/**
 * Store experiment design data to the related variable
 *
 * @title Save Design Information
 * @category Storage
 * @author Malte Meng
 * @param {string} type - Pick between: hyp, e_name, goa, proc, design, ss, iv, dv
 * @param {any} value - Set the value of the variable. Type 'null' or leave empty to erase it.
 */

const axios = require('axios');

const saveVar = async (type, value) => {
    if (user.design == undefined){
        user.design = {};
        user.design["iv"] = [];
        user.design["dv"] = [];
    }
    user.design[type] = value;

    axios.post('http://localhost:8000/exp_design/', {
        user_id: event.target,
        variable: type,
        value: value
      })
  }
  
  return saveVar(args.type, args.value, args.stype, args.sstype)
  