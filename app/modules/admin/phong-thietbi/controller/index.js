// 'use strict'

// import mongoose from 'mongoose'

// const phongThietBi = mongoose.model('phongThietBi')

// const save = async (request, h) => {
//   try {
//     let data = request.payload
//     let item = {}
//     if(!data._id){
//       item = new phongThietBi(data)
//     }
//     else{
//       item = await phongThietBi.findById(data._id)
//       item = Object.assign(item, data)
//     }
//     return await item.save()
//   } catch (error) {
//     throw(error)
//   }
// }

// const get = async (request, h) =>{
//   return await phongThietBi.find().populate([{path: 'phongID'},{path: 'thietBiID'}])
// }

// export default { save, get}