const schema = {
  tenLoaiNguoiDung: String,
  moTa: String,
}

const options = {
  collection:'loainguoidungs',
  timestamps: true,
  vituals: true 
}

export {schema, options}