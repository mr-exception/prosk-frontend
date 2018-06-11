const getToken = require('./Token').getToken
const enviroment = require('../Enviroment');
const request = require("request");

const getTracks = (task_id, onSuccess, onFail) => {
    getToken((token) => {
        var request = require("request");

        var options = {
            method: 'POST',
            url: 'http://localhost:8000/api/track',
            headers: { 'content-type': 'application/json', token: 'CMQTGfkQW15mYP0KWANZKOltoyvJS0IaTWblyKPTaCKlX' },
            body: { task_id: 15, limit: 999 },
            json: true 
        };

        request(options, function (error, response, body) {
            if (error) onFail(error);
            else {
                console.log(body)
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