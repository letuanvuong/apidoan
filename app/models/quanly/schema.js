const schema = {
  tenNguoiQL: String,
  ngaySinh: Date,
  gioiTinh: Boolean,
  SDT: String,
  diaChi: String
}

const options = {
  collection: 'quanlys',
  timestamps: true,
  vituals: true
}

export {schema, options}