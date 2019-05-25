import { Schema } from 'mongoose'

const schema = {
  tenNguoiDung: String,
  ngaySinh: Date,
  gioiTinh: String,
  soDT: String,
  email: String,
  hinhAnhs: [String],
  userName: String,
  password: String,
  loaiNguoiDungID: 
  {
    type: Schema.Types.ObjectId,
    ref:'LoaiNguoiDung'
  }
}

const options = {
  collection: 'nguoidungs',
  timestamps: true
}

export {schema, options}