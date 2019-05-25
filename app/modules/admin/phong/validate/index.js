'use strict'

const Joi = require('joi')

const PhongVal = {
  save: {
      payload:{
        _id: Joi.string(),
        tenPhong: Joi.string(),
        sucChua: Joi.number(),
        tinhTrang: Joi.string(),
        hinhAnhs: [Joi.object().required(), Joi.string().required()],
        giangDuongID: Joi.string().length(24)
      },
      options:{
        allowUnknown: true
      }
  },
  saveThietBi: {
    payload:{
      phongId: Joi.string(),
      // tinhTrang: Joi.string(),
      // soLuong: Joi.number(),
      ghiChu: Joi.string(),
      thietBiId: Joi.string()
    },
    options:{
      allowUnknown: true
    }
  }
}

export default {...PhongVal}