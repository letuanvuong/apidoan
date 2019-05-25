'use strict'

import mongoose from 'mongoose'
import Boom from 'boom'
const NguoiDung = mongoose.model('NguoiDung')
const save = async (request, h) => {
  try {
    let data = request.payload
    //tách img bên payload form thành image và base64
    let base64 = data && data.hinhAnhs && data.hinhAnhs.imageURL
    //convert base64 to image------------------------------------------------
    if (base64 && base64.match(/data(.*?)base64,/)) {
      // data.hinhAnhs.imageURL = "app/lib/img/" + data.hinhAnhs.image
      let base64Data = base64.replace(/data(.*?)base64,/, "");
      require("fs").writeFile("app/lib/img/" + data.hinhAnhs.image, base64Data, 'base64', function (err) {
      });
      data.hinhAnhs = data.hinhAnhs.image
    }
    //--------------------------------------------------------------------------
    let item
    if (!data._id) {
      item = await NguoiDung.create(data)
    } else {
      item = await NguoiDung.findByIdAndUpdate(data._id, {
        tenNguoiDung: data.tenNguoiDung,
        ngaySinh:data.ngaySinh,
        gioiTinh:data.gioiTinh,
        soDT: data.soDT,
        email: data.email,
        hinhAnhs: data.hinhAnhs,
        userName: data.userName,
        password: data.password,
        loaiNguoiDungID: data.loaiNguoiDungID
      })
    }
    return item
  } catch (error) {
    throw (error)
  }
}

const get = async (request, h) => {
  return await NguoiDung.find().populate([
    { path: 'loaiNguoiDungID' },
    { path: 'dsnhatkyphanhoitunguoidung' }    
  ]).lean()
}

const Delete = async (request, h) => {
  return await NguoiDung.findOneAndRemove({ _id: request.params.id })
}

const login = async (request, h) => {
  try {
    let {payload} = request
    let user = await NguoiDung.findOne({userName: payload.userName, password: payload.password}).lean()
    if (!user) {
      return {
        login: false
      }
    } else {
      return {
        ...user,
        login: true
      }
    }
  } catch (error) {
    Boom.badRequest(error)
  }
}

export default { save, get, Delete, login }