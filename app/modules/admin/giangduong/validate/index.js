'use strict'
//muon dung object thi Joi phai khai bao la const chu k import
//neu import phai nho lenh
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const GiangDuongVal = {
    save: {
        payload:{
            _id: Joi.string(),
            ten: Joi.string().required(),
            soTang: Joi.number().required(),
            hinhAnhs: [Joi.object().required(), Joi.string().required()],
            quanLyID: Joi.string().length(24)
        }
    },
    options:{
        allowUnknown: true
    }
}
export default {...GiangDuongVal}