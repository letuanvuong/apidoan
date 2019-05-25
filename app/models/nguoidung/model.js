'use strict'

import mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const NguoiDungSchema = new Schema(schema, options)

NguoiDungSchema.virtual('dsnhatkyphanhoitunguoidung',{
  ref:'NhatKyPhanHoi',
  localField: '_id',
  foreignField: 'nguoiDungID'
})

export default mongoose.model('NguoiDung', NguoiDungSchema)