'use strict'

import mongoose from 'mongoose'


const NhatKySuDung = mongoose.model('NhatKySuDung')
const save = async (request, h) => {
  try {
      let data = request.payload
      let item
      if (!data._id) {
          item = await NhatKySuDung.create(data)
      } else {
          item = await NhatKySuDung.findByIdAndUpdate(data._id, {
              ngayNhap: data.ngayNhap,
              moTa: data.moTa,
              thietBiID: data.thietBiID
          })
      }
      return item
  } catch (error) {
      throw (error)
  }
}

const get = async(request, h) =>{
  return await NhatKySuDung.find().populate({path: 'thietBiID'}).lean()
}

const Delete = async (request, h)=>{
  return await NhatKySuDung.findByIdAndRemove({ _id: request.params.id })
}

export default {save, get, Delete}

