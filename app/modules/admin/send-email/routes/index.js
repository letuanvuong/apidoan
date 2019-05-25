import Controller from '../controller/index.js'

export default [{
  method:'POST',
  path:'/send-email',
  handler: Controller.sendEmail,
  config:{
    tags:['api'],
    plugins: {
      'hapi-swagger': {
        responses: { '400': { 'description': 'Bad Request' } },
        payloadType: 'json'
      }
    }
  }
}]