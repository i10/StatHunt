/**
 * Store experiment design data to the related variable
 *
 * @title Set Variable Name
 * @category Independent Variable
 * @author Malte Meng
 * @param {any} value - Variable name. Type 'null' or leave empty to erase it.
 */
const setVarName = async (value) => {
    console.log(user.design)
    if (user.design == undefined){
        user.design = {};
        user.design["iv"] = [];
        user.design["dv"] = [];
    }
    while(user.design["iv"].length < temp.factors){
        user.design["iv"].push({});
    }
    console.log(user.design)
    user.design["iv"][temp.curr_fact-1]["name"] = value;
    console.log(user.design);
  }
  
  return setVarName(args.value);
  