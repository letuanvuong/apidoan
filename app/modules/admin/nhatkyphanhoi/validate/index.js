'use strict'

const Joi = require('joi')
const NhatKyPhanHoiVal = {
  save: {
    payload: {
      _id: Joi.string()
      // soLuong: Joi.number().required(),
      // tinhTrang: Joi.string().required(),
      // moTa: Joi.string().required(),
      // thoiGianDuyet: Joi.date(),
      // ngayCapNhat: Joi.date(),
      // trangThai: Joi.string(),
      // tinhTrangThietBiID: Joi.string().length(24),
      // nguoiDungID: Joi.string().length(24),
      // phongID: Joi.string().length(24),
    },
    options: {
      allowUnknown: true
    }
  }
}
export default { ...NhatKyPhanHoiVal }