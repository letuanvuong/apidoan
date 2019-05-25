import PhongController from '../controller/index.js'
import PhongVal from '../validate/index.js';

export default [
  {
    method: 'POST',
    path: '/phong',
    handler: PhongController.save,
    config: {
      validate: PhongVal.save,
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: { '400': { 'description': 'Bad Request' } },
          payloadType: 'json'
        }
      }
    }
  }, {
    method: 'GET',
    path: '/get-phongs',
    handler: PhongController.get,
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
    path: '/delete-phong/{id}',
    handler: PhongController.Delete
  },
  // {
  //   method: 'GET',
  //   path: '/image/{img}',
  //   handler: function(request, h){
  //     try {
  //       return h.file('app/lib/img'+ request.params.img);
  //     } catch (err) {

  //     }
  //   }
  // }
  {
    method: 'GET',
    path: '/getbyid-phong/{id}',
    handler: PhongController.getByid,
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
    method: 'POST',
    path: '/phong-thietbi',
    handler: PhongController.saveThietBi,
    config: {
      validate: PhongVal.saveThietBi,
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
    path: '/phong/{phongId}/delete-phong-thietbi/{_id}',
    handler: PhongController.DeleteThietbi
  }
]
