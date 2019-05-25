'use strict'

import Joi from 'joi'

const QuanLyVal = {
  save: {
    payload:{
      _id: Joi.string(),
      tenNguoiQL: Joi.string().required(),
      ngaySinh: Joi.date().required(),
      gioiTinh: Joi.boolean().required(),
      SDT: Joi.string().required(),
      diaChi: Joi.string().required()
    },
    options: {
      allowUnknown: true
    }
  }
}

export default QuanLyVal