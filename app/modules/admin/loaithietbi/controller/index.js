'use strict'

import mongoose from 'mongoose'

const LoaiThietBi = mongoose.model('LoaiThietBi')

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id){
      item = new LoaiThietBi(data)
    }
    else{
      item = await LoaiThietBi.findById(data._id)
      item = Object.assign(item, data)
    }
    return await item.save()
  } catch (error) {
    throw(error)
  }
}

const get = async (request, h) =>{
  return await LoaiThietBi.find().populate([{
    path:'dsthietbis',
    populate: [{
      path: 'dsphongsudung'
    }]
  }]).lean()
}

export default { save, get}