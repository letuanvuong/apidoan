import NhatKySuDungController from '../controller/index.js'
import NhatKySuDungVal from '../validate/index.js'

export default [{
  method: 'POST',
  path:'/nhatkysudung',
  handler: NhatKySuDungController.save,
  config:{
    validate: NhatKySuDungVal.save,
    tags:['api'],
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
  path:'/get-nhatkysudung',
  handler: NhatKySuDungController.get,
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
  path: '/delete-nhatkysudung/{id}',
  handler: NhatKySuDungController.Delete
}
]