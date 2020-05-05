/**
 * Store experiment design data to the related variable
 *
 * @title Set Additional Info
 * @category Dependent Variable
 * @author Malte Meng
 * @param {any} value - The additional info. Type 'null' or leave empty to erase it.
 */

const setAdditionalInfo = async (value) => {
    user.design["dv"][temp.curr_variable-2]["additional_info"] = value;
  }
  
  return setAdditionalInfo(args.value);
  