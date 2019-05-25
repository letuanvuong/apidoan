'use strict'

import mongoose from 'mongoose'
import { request } from 'https';

const TinhTrangThietBi = mongoose.model('TinhTrangThietBi')

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id){
      item = new TinhTrangThietBi(data)
    }
    else{
      item = await TinhTrangThietBi.findById(data._id)
      item = Object.assign(item, data)
    }
    return await item.save()
  } catch (error) {
    throw(error)
  }
}

const get = async(request, h) =>{
  return await TinhTrangThietBi.find().populate({
    path:'dsnhatkyphanhois'
  }).lean()
}

export default {
  save,
  get
}
