'use strict'

import mongoose from 'mongoose'

const LoaiNguoiDung = mongoose.model('LoaiNguoiDung')

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id){
      item = new LoaiNguoiDung(data)
    }
    else{
      item = await LoaiNguoiDung.findById(data._id)
      item = Object.assign(item, data)
    }
    return await item.save()
  } catch (error) {
    throw(error)
  }
}

const get = async (request, h) =>{
  return await LoaiNguoiDung.find().populate({path:'dsnguoidungs'}).lean()
}

const Delete = async (request, h) => {
  return await LoaiNguoiDung.findOneAndRemove({ _id: request.params.id })
}

export default {
  save,
  get,
  Delete
}
