import {Schema} from 'mongoose'

const schema = {
  tenThietBi: String,
  hinhAnhs: [String],
  moTa: String,
  loaiThietBiID: {
    type: Schema.Types.ObjectId,
    ref:'LoaiThietBi'
  },
  // phongs: [{
  //   item: {
  //     type: Schema.Types.ObjectId,
  //     ref:'Phong'
  //   },
  //   tinhTrang: String,
  //   soLuong: Number,
  //   ghiChu: String
  // }]
}

const options = {
  collection: 'thietbis',
  timestamps: true
}

export {schema, options}