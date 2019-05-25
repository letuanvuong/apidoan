import ThietBiController from '../controller/index.js'
import ThietBiVal from '../validate/index.js'

export default [{
  method:'POST',
  path:'/thietbi',
  handler: ThietBiController.save,
  config:{
    validate: ThietBiVal.save,
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
  path:'/get-thietbi',
  handler: ThietBiController.get,
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
  path: '/delete-thietbi/{id}',
  handler: ThietBiController.Delete
}
]