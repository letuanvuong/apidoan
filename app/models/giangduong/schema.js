import { Schema } from "mongoose";

const schema = {
  ten: String,
  soTang: Number,
  hinhAnhs: [String],
  quanLyID: {
    type: Schema.Types.ObjectId,
    ref: 'QuanLy'
  }
}

const options = {
  collection: 'giangduongs',
  timestamps: true,
  virtuals: true
}

export {schema, options}