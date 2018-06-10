module.exports = {
    title: 'Prosk',
    caption: 'simple time tracker',

    layouts: {
        main: {
            drawerWidth: 240
        }
    },
    server: {
        url: 'http://localhost:8000/api',
        cookieMaxAge: 3600*12
    }
}