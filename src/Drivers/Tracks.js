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

const newTrack = (task_id, description, started_at, finished_at, onSuccess, onFail) => {
    getToken((token) => {
        const options = { method: 'POST',
            url: `${enviroment.server.url}/track/insert/${task_id}`,
            headers: { 'content-type': 'application/json', token },
            body: { description, started_at, finished_at }, 
            json: true 
        };
        console.log(options)
        request(options, function (error, response, body) {
            if (error) onFail(error);
            else {
                if(body.ok)
                    onSuccess(body.track)
                else
                    onSuccess(body.errors)
            }
        });
    }, (error) => {
        onFail(error)
    })
}
module.exports = {
    getTracks,
    newTrack,
}