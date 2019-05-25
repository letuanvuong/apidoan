'use strict'

import mongoose from 'mongoose'
const nodemailer = require("nodemailer")

const NhatKyPhanHoi = mongoose.model('NhatKyPhanHoi')

const save = async (request, h) => {
  try {
      let data = request.payload
      let item = {}
      if (!data._id) {
          item = await NhatKyPhanHoi.create(data)
      } else {
        item = await NhatKyPhanHoi.findByIdAndUpdate(data._id, {
            soLuong: data.soLuong,
            tinhTrang: data.tinhTrang,
            trangThai: data.trangThai,
            moTa: data.moTa,
            nguoiYeuCauID: data.nguoiYeuCauID,
            phongID: data.phongID,
            thietBiID: data.thietBiID,
            nguoiPheDuyetId: data.nguoiPheDuyetId,
            thoiGianDuyet: data.thoiGianDuyet
        })
      }
      
    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'letuanvuongk57@gmail.com',
    //     pass: '01686741583'
    //   }
    // });
  
    // var mailOptions = {
    //   from: 'letuanvuongk57@gmail.com',
    //   to: 'vuonggl.it@gmail.com',
    //   subject: 'Sending Email using Node.js',
    //   text: 'That was easy!'
    // };
    // console.log(123213123)
  
    // data = await transporter.sendMail(mailOptions);
    // console.log(data)
      return item
  } catch (error) {
      throw (error)
  }
}

const get = async (request, h)=>{
  try {
  
    return await NhatKyPhanHoi.find().populate([
      // {
      //   path:'TinhTrangThietBiID'
      // },
      {
        path:'nguoiYeuCauID'
      },
      {
        path:'nguoiPheDuyetId'
      },
      {
        path:'phongID',
        populate: [{
          path: 'thietBis.item'
        }]
      }
    ]
    ).lean()
  } catch (error) {
    console.log(error)
  }
}

export default {
  save, get
}