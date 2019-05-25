import { Schema} from 'mongoose'

const schema = {
  ngayNhap: Date,
  moTa: String,
  thietBiID:
  {
    type: Schema.Types.ObjectId,
    ref:'ThietBi'
  }
}

const options = {
  collection: 'nhatkysudungs',
  timestamps: true
}

export {schema, options}