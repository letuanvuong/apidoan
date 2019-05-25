'use strict'

import mongoose from 'mongoose'

const QuanLy = mongoose.model('QuanLy')

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id){
      item = new QuanLy(data)
    } else{
      item = await QuanLy.findById(data._id)
      item = Object.assign(item, data)
    }
    return await item.save()
  } catch (error) {
    throw (error)
  }
  
}

const get = async (request, h) =>{
  return await QuanLy.find().populate('dsgiangduongs').lean()
}

const Delete = async (request, h) =>{
  return await QuanLy.findByIdAndRemove({ _id: request.params.id })
}

export default {save, get, Delete}