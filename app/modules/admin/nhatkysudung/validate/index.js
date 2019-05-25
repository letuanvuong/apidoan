'use strict'

const Joi = require('joi')
const NhatKySuDungVal = {
  save: {
    payload: {
      _id: Joi.string(),
      ngayNhap: Joi.date(),
      moTa: Joi.string(),
      thietBiID: Joi.string().length(24)
    },
    options: {
      allowUnknown: true
    }

  }
}

export default { ...NhatKySuDungVal }