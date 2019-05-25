// import PhongThietBiController from '../controller/index.js'
// import PhongThietBiVal from '../validate/index.js'

// export default [{
//   method: 'POST',
//   path: '/phongthietbi',
//   handler: PhongThietBiController.save,
//   config: {
//     validate: PhongThietBiVal.save,
//     tags: ['api'],
//     plugins: {
//       'hapi-swagger': {
//         responses: { '400': { 'description': 'Bad Request' } },
//         payloadType: 'json'
//       }
//     }
//   }
// },
// {
//   method:'GET',
//   path:'/get-phongthietbi',
//   handler: PhongThietBiController.get,
//   config: {
//     tags: ['api'],
//     plugins: {
//         'hapi-swagger': {
//             responses: { '400': { 'description': 'Bad Request' } },
//             payloadType: 'json'
//         }
//     }
// }
// }
// ]