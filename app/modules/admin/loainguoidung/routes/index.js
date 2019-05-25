import LoaiNguoiDungController from '../controller/index'
import LoaiNguoiDungVal from '../validate/index'

export default [{
  method: 'POST',
    path: '/loainguoidung',
    handler: LoaiNguoiDungController.save,
    config: {
        validate: LoaiNguoiDungVal.save,
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
  path: '/get-loainguoidung',
  handler: LoaiNguoiDungController.get,
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
  method:'DELETE',
  path:'/delete-loainguoidung/{id}',
  handler: LoaiNguoiDungController.Delete
}
]