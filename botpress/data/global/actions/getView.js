/**
 * Gets current view and saves it under user.view
 * @title Get Current View
 * @category Misc.
 * @author Malte Meng
 */

const axios = require('axios');

const getView = async () => {
    axios.get('localhost:8000/getview/' + event.target)
        .then(function (response) {
            user.curr_view = (response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    console.log(user.curr_view)
}

return getView()
