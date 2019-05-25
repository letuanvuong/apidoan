import NguoiDungController from '../controller/index'
import NguoiDungVal from '../validate/index'

export default [
  {
    method: 'POST',
    path: '/nguoidung',
    handler: NguoiDungController.save,
    config: {
      validate: NguoiDungVal.save,
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
    path: '/get-nguoidungs',
    handler: NguoiDungController.get,
    config: {
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
    method: 'DELETE',
    path: '/delete-nguoidung/{id}',
    handler: NguoiDungController.Delete
  },
  {
    method: 'POST',
    path: '/login',
    handler: NguoiDungController.login,
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