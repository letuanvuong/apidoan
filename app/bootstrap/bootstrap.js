'use strict'
export const loader = async function (server) {
  const Pack = require('./../../package')
  await server.register([
    {
      plugin: require('inert')
    },
    {
      plugin: require('vision')
    },
    {
      plugin: require('hapi-swagger'), // inert, vision dependency
      options: {
        host: global.CONFIG.get('web.swagger.host'),
        schemes: global.CONFIG.get('web.swagger.schemes'),
        info: {
          title: 'Documentation',
          version: Pack.version
        }
      }
    },
    {
      plugin: require('../lib/mongo.js'),
      
      
    }
  ])
    .then(async (err) => {
      if (err) {
        console.log(err)
      }
      /* Load models */
      require('@models/giangduong/model.js')
      require('@models/phong/model.js')
      require('@models/quanly/model.js')
      require('@models/loaithietbi/model.js')
      require('@models/thietbi/model.js')
      require('@models/loainguoidung/model.js')
      require('@models/nguoidung/model.js')
      require('@models/nhatkyphanhoi/model.js')
      require('@models/nhatkysudung/model.js')
      
      
      // require('@models/phong-thietbi/model.js')
      

      /* Load Modules */
      let modules = []
      modules.push(require('@modules/admin/giangduong'))
      modules.push(require('@modules/admin/phong'))
      modules.push(require('@modules/admin/quanly'))
      modules.push(require('@modules/admin/loaithietbi'))
      modules.push(require('@modules/admin/thietbi'))
      // modules.push(require('@modules/admin/phong-thietbi'))
      modules.push(require('@modules/admin/loainguoidung'))
      modules.push(require('@modules/admin/nguoidung'))
      modules.push(require('@modules/admin/nhatkyphanhoi'))
      modules.push(require('@modules/admin/send-email'))
      modules.push(require('@modules/admin/nhatkysudung'))

      if (modules.length) {
        let options = {}
        options.routes = { prefix: '/api/v1' }
        await server.register(modules, options, (err) => {
          if (err) {
            console.log(err)
          }
        })
      }
      // console.log(server)
    })
}
