const getToken = require('./Token').getToken
const enviroment = require('../Enviroment');
const request = require("request");

const getTasks = (filters, onSuccess, onFail) => {
    getToken((token) => {
        const options = { 
            method: 'POST',
            url: `${enviroment.server.url}/task`,
            headers: { 'content-type': 'application/json',token },
            body: filters,
            json: true
        };

        request(options, function (error, response, body) {
            if (error) onFail(error);
            else{
                onSuccess(body);
            }
        });

    }, (errors) => {
        onFail(errors)
    })    
}

const countTasks = (filters, onSuccess, onFail) => {
    getToken((token) => {
        const options = { 
            method: 'POST',
            url: `${enviroment.server.url}/task/count`,
            headers: { 'content-type': 'application/json',token },
            body: filters,
            json: true
        };

        request(options, function (error, response, body) {
            if (error) onFail(error);
            else{
                if(body.ok)
                    onSuccess(body.count);
                else
                    onFail(body.errors);
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

const finishTask = (task_id, onSuccess, onFail) => {
    getToken((token) => {
        const options = { 
            method: 'POST',
            url: `${enviroment.server.url}/task/finish/${task_id}`,
            headers: { 'content-type': 'application/json', token} 
        };
        request(options, function (error, response, body) {
            if(error) onFail(error)
            else{
                if(JSON.parse(body).ok)
                    onSuccess()
                else
                    onFail()
            }
        });
    })
}

const doingTask = (task_id, onSuccess, onFail) => {
    getToken((token) => {
        const options = { method: 'PUT', url: `${enviroment.server.url}/task/${task_id}`,
        headers: { 'content-type': 'application/json', token },
        body: { status: 1 },
        json: true };

        request(options, function (error, response, body) {
            if (error)
                onSuccess(error)
            else{
                if(body.ok)
                    onSuccess(body)
                else
                    onFail(body.errors)
            }
        });

    })
}
module.exports = {
    getTasks,
    countTasks,
    newTask,
    removeTask,
    finishTask,
    doingTask,
}