/**
 *
 * @title Change Current View
 * @category Misc.
 * @author Malte Meng
 * @param {int} view - Set the value of the new view
 */

const axios = require('axios');

const setView = async (view) => {
    axios.post('localhost:8000/setview/' + event.target, null, 
    {params: {
        'view': view
    }})
  }
  
  return setView(args.view)
  