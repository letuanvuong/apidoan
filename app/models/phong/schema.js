import { Schema } from 'mongoose'

const schema = {
  tenPhong: String,
  sucChua: Number,
  tinhTrang: {
    type: String
  },
  hinhAnhs: [String],
  giangDuongID:
  {
    type: Schema.Types.ObjectId,
    ref: 'GiangDuong'
  },
  thietBis: [{
    item: {
      type: Schema.Types.ObjectId,
      ref: 'ThietBi'
    },
    tinhTrangSoLuong: [{
      tinhTrang: String,
      soLuong: Number,
    }],
    ghiChu: String
  }]
}

const options = {
  collection: 'phongs',
  timestamps: true
}

export { schema, options }