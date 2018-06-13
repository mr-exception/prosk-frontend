const cookie = require("react-cookies");
const enviroment = require('../Enviroment');
const request = require("request");

const getToken = (onSuccess, onFail) => {
    const user_token = cookie.load('user_token') || 'NONE';
    if(user_token === 'None'){
        generateToken((token) => {
            cookie.save('user_token', token, {maxAge: enviroment.server.cookieMaxAge})
            onSuccess(token)
        }, (error) => {
            console.log(error)
            onFail(error)
        })
    }else{
        checkToken(user_token, () => {
            onSuccess(user_token)
        }, () => {
            generateToken((token) => {
                cookie.save('user_token', token, {maxAge: enviroment.server.cookieMaxAge})
                onSuccess(token)
            }, (error) => {
                onFail(error)
            })
        })
    }
}

const checkToken = (token, onSuccess, onFail) => {
    const options = { method: 'POST',
        url: `${enviroment.server.url}/token/check`,
        headers: { 'content-type': 'application/json' },
        body: { token },
        json: true };
    request(options, function (error, response, body) {
        if (error) onFail(error);
        else{
            if(body.ok)
                onSuccess()
            else
                onFail()
        }
    });

}

const generateToken = (onSuccess, onFail) => {
    const options = { method: 'POST',
        url: `${enviroment.server.url}/token/generate`,
        headers: { 'content-type': 'application/json' } 
    };
    request(options, function (error, response, body) {
        if (error) onFail(error);
        else onSuccess(JSON.parse(body).user.token);
    });
}

module.exports = {
    getToken
}