'use strict'

const Joi = require('joi')

const LoaiThietBiVal = {
  save: {
    payload: {
      tenLoaiThietBi: Joi.string().required(),
      xuatXu: Joi.string().required()
    }
  }
}

export default {...LoaiThietBiVal}