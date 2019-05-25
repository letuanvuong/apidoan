'use strict'

const Joi = require('joi')
const TinhTrangThietBiVal = {
  save: {
    payload: {
      tenTinhTrangTB: Joi.string().required(),
      moTa: Joi.string().required()
    }
  }
}

export default {...TinhTrangThietBiVal}