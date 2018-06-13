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