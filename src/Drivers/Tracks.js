const getToken = require('./Token').getToken
const enviroment = require('../Enviroment');
const request = require("request");

const getTracks = (task_id, onSuccess, onFail) => {
    getToken((token) => {
        const options = { method: 'GET',
            url: `${enviroment.server.url}/track`,
            headers: { 'content-type': 'application/json', token }, 
            body: { task_id }, json: true 
        };

        request(options, function (error, response, body) {
            if (error) onFail(error);
            else {
                onSuccess(body)
            }
        });

    }, (error) => {
        onFail(error)
    })
}
module.exports = {
    getTracks,
}