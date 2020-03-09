const nextRoutes = require('next-routes')
const {join} = require('path')
const routes = (module.exports = nextRoutes())

routes.add('index', '/')
routes.add('visagift', '/canada-gift-visa')
routes.add('404', '/404')
routes.add('400', '/404')
