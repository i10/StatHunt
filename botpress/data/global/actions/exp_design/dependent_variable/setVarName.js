/**
 * Store experiment design data to the related variable
 *
 * @title Save Dependent Variable Name
 * @category Dependent Variable
 * @author Malte Meng
 * @param {any} value - Set the value of the variable. Type 'null' or leave empty to erase it.
 */
const saveVar = async (value) => {
    if (user.design == undefined){
        user.design = {};
        user.design["iv"] = [];
        user.design["dv"] = [];
    }
    while(user.design["dv"].length < temp.variables){
        user.design["dv"].push({});
    }
        
    user.design["dv"][temp.curr_variable-1]["name"] = value;
    console.log(user.design)
  }
  
  return saveVar(args.value);
  