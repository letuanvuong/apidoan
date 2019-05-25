import NhatKyPhanHoiController from '../controller/index'
import NhatKyPhanHoiVal from '../validate/index'

export default [
  {
    method:'POST',
    path: '/nhatkyphanhoi',
    handler: NhatKyPhanHoiController.save,
    config:{
      validate: NhatKyPhanHoiVal.save,
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
    method:'GET',
    path:'/get-nhatkyphanhoi',
    handler: NhatKyPhanHoiController.get,
    config:{
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