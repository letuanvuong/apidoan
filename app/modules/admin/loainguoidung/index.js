import Routes from './routes/index'

exports.register = async(server, option) =>{
  server.route(Routes)
}
exports.name = 'admin-loainguoidung'