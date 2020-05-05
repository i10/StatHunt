/**
 * Store experiment design data to the related variable
 *
 * @title Set Level Value Name
 * @category Independent Variable
 * @author Malte Meng
 * @param {any} value - Level Value. Type 'null' or leave empty to erase it.
 */
const setVarName = async (value) => {
    if(temp.curr_level == 2){
        user.design["iv"][temp.curr_fact-2]["levels"] = []
    }
    user.design["iv"][temp.curr_fact-2]["levels"].push(value);
    console.log(user.design);
  }
  
  return setVarName(args.value);
  