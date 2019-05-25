import QuanLyController from '../controller/index.js'
import QuanLyVal from '../validate/index.js'

export default [{
  method: 'POST',
  path: '/quanly',
  handler: QuanLyController.save,
  config: {
    validate: QuanLyVal.save,
    tags: ['api'],
    plugins: {
      'hapi-swagger':{
        reponses: {'400':{'description':'Bad Request'}},
        payloadType: 'Json'
      }
    }
  }
},
{
  method:'GET',
  path:'/get-quanly',
  handler: QuanLyController.get,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger':{
        reponses: {'400':{'description':'Bad Request'}},
        payloadType: 'Json'
      }
    }
  }
},
{
  method:'DELETE',
  path:'/delete-quanly/{id}',
  handler: QuanLyController.Delete,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger':{
        reponses: {'400':{'description':'Bad Request'}},
        payloadType: 'Json'
      }
    }
  }
}
]