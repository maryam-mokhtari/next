const nextRoutes = require('next-routes')
const {join} = require('path')
const routes = (module.exports = nextRoutes())

routes.add('index', '/')
routes.add('fames', '/fames/:pageNumber')
routes.add('fame', '/fame/:fameId')
