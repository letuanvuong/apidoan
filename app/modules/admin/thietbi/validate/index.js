'use strict'

const Joi = require('joi')
const ThietBiVal = {
  save:{
    payload:{
      _id: Joi.string(),
      tenThietBi: Joi.string(),
      hinhAnhs: [Joi.object().required(), Joi.string().required()],
      moTa: Joi.string(),
      loaiThietBiID: Joi.string().length(24)
    }
  }
}

export default {...ThietBiVal}