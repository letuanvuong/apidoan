import {Schema} from 'mongoose'

const schema = {
  soLuong: Number,
  tinhTrang: String,
  moTa: String,
  thoiGianDuyet: Date,
  ngayPhanHoi: {
    type: Date,
    default: Date.now()
  },
  trangThai: {
    type: String,
    default: 'Chưa duyệt'
  },
  nguoiYeuCauID:{
    type: Schema.Types.ObjectId,
    ref:'NguoiDung'
  },
  nguoiPheDuyetId:{
    type: Schema.Types.ObjectId,
    ref:'NguoiDung'
  },
  thietBiID: {
    type: Schema.Types.ObjectId
  },
  phongID: {
    type: Schema.Types.ObjectId,
    ref:'Phong'
  }
}

const options = {
  collection:'nhatkyphanhois',
  timestamps: true
}

export {schema, options}