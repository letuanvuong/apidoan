import TinhTrangThietBiController from '../controller/index'
import TinhTrangThietBiVal from '../validate/index'

export default [
  {
    method: 'POST',
    path: '/tinhtrangthietbi',
    handler: TinhTrangThietBiController.save,
    config: {
      validate: TinhTrangThietBiVal.save,
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
    path: '/get-tinhtrangthietbi',
    handler: TinhTrangThietBiController.get,
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