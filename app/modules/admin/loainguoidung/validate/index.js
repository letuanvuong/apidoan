'use strict'

const Joi = require('joi')

const LoaiNguoiDungVal = {
  save: {
    payload: {
      tenLoaiNguoiDung: Joi.string().required(),
      moTa: Joi.string().required()
    }
  }
}
 export default {...LoaiNguoiDungVal}