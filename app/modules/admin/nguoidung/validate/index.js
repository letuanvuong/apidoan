'use strict'

const Joi = require('joi')

const NguoiDungVal = {
  save: {
      payload:{
        _id: Joi.string(),
        tenNguoiDung: Joi.string(),
        ngaySinh: Joi.date(),
        gioiTinh: Joi.string(),        
        soDT: Joi.string(),
        email: Joi.string(),
        hinhAnhs: [Joi.object().required(), Joi.string().required()],
        userName: Joi.string(),
        password: Joi.string(),
        loaiNguoiDungID: Joi.string().length(24)
      },
      options:{
        allowUnknown: true
      }
  }
}

export default {...NguoiDungVal}