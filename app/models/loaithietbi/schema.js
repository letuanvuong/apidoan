const schema = {
  tenLoaiThietBi: String,
  xuatXu: String
}

const options = {
  collection: 'loaithietbis',
  timestamps: true,
  vituals: true
}
export {schema, options}