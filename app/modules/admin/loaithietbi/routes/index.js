import LoaiThietBiController from '../controller/index.js'
import LoaiThietBiVal from '../validate/index.js'

export default [{
  method: 'POST',
  path: '/loaithietbi',
  handler: LoaiThietBiController.save,
  config: {
    validate: LoaiThietBiVal.save,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: { '400': { 'description': 'Bad Request' } },
        payloadType: 'json'
      }
    }
  }
},

{
  method: 'GET',
  path: '/get-loaithietbi',
  handler: LoaiThietBiController.get,
  config: {
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: { '400': { 'description': 'Bad Request' } },
        payloadType: 'json'
      }
    }
  }
}
]