# Prosk Front-end
this project is designed by react-dom tools and used material-ui to implement the components. after lunching the project. every time, that user opens the project root page (dashboard), application checks if is there any token in cookie and if found the token. check the token with server and get all tasks. but if token not found or syncing token failed in server. server generates new token for user and returns to applications. so user don't need any login or registration. tokens expiration is 60 days after saving in cookie. but you can change this in `Enviroment` file described below.

#### requirements
* nodejs >= `v8.9.4`
* npm >= `v6.1.0`
* git >= `v2.15.1`

#### install project
clone project from github repository by command:
```
git clone https://github.com/mr-exception/prosk-frontend.git
```
enter the project directory:
```
cd prosk-frontend
```
install all the packages and run the project
```
npm i
npm start
```
config the project as way you want. main config file is in `src/Enviroment/index.js` it's like:
```
module.exports = {
    // title of project, shown on the navbar and tabs title
    title: 'Prosk',
    // caption of project
    caption: 'simple time tracker',
    /**
     * server inforamtions
     */
    server: {
        url: 'http://localhost:8000/api',
        cookieMaxAge: 3600*24*7 // seconds
    },
    // first load of tasks limit and every scroll have to load how many tasks more
    main_page_item_load_count: 5,
}
```
now you can enjoy the application in link `http://localhost:3000`