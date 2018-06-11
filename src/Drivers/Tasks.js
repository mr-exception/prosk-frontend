const getToken = require('./Token').getToken
const enviroment = require('../Enviroment');
const request = require("request");

const getTasks = (onSuccess, onFail) => {
    getToken((token) => {
        const options = { 
            method: 'POST',
            url: `${enviroment.server.url}/task`,
            headers: { 'content-type': 'application/json',token } };

        request(options, function (error, response, body) {
            if (error) onFail(error);
            else{
                onSuccess(JSON.parse(body))
            }
        });

    }, (errors) => {
        onFail(errors)
    })    
}
const newTask = (title, description, start_time, finish_time, poritory, onSuccess, onFail) => {
    getToken((token) => {
        var options = { method: 'POST',
        url: `${enviroment.server.url}/task/create`,
        headers: 
        { 'content-type': 'application/json', token},
        body: { title, description, start_time, finish_time, poritory }, json: true };

        request(options, function (error, response, body) {
            if (error) onFail(error);
            else{
                if(body.ok)
                    onSuccess(body.task)
                else
                    onFail(body.errors)
            }
        });

    }, (errors) => {
        onFail(errors)
    })
}

const removeTask = (task_id, onSuccess, onFail) => {
    getToken((token) => {
        const options = { 
            method: 'DELETE',
            url: `${enviroment.server.url}/task/${task_id}`,
            headers: { token, 'content-type': 'application/json' }
        };

        request(options, function (error, response, body) {
            if(error) onFail(error);
            else{
                console.log(body)
                if(JSON.parse(body).ok)
                    onSuccess()
                else
                    onFail()
            }
        });
    }, (errors) => {
        onFail(errors)
    })
}


module.exports = {
    getTasks,
    newTask,
    removeTask,
}