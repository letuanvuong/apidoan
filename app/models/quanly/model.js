'use strict'

import mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const QuanLySchema = new Schema(schema, options)

QuanLySchema.virtual('dsgiangduongs',{
  ref: 'GiangDuong',
  localField: '_id',
  foreignField: 'quanLyID'
})

export default mongoose.model('QuanLy', QuanLySchema )