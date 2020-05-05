/**
 * Store experiment design data to the related variable
 *
 * @title Set Scale of Measurement
 * @category Dependent Variable
 * @author Malte Meng
 * @param {any} value - Set the scale of measurement. Type 'null' or leave empty to erase it.
 */
const setScaleOfMeasurement = async (value) => {
    user.design["dv"][temp.curr_variable-2]["scale_of_measurement"] = value;
    console.log(user.design);
  }
  
  return setScaleOfMeasurement(args.value);
  