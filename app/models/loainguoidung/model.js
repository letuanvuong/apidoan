'use strict'

import mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const LoaiNguoiDungSchema = new Schema(schema, options)

LoaiNguoiDungSchema.virtual('dsnguoidungs',{
  ref: 'NguoiDung',
  localField: '_id', 
  foreignField: 'loaiNguoiDungID'
})


export default mongoose.model('LoaiNguoiDung', LoaiNguoiDungSchema)