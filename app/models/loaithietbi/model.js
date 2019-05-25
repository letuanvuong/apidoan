'use strict'

import mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const LoaiThietBiSchema = new Schema(schema, options)

LoaiThietBiSchema.virtual('dsthietbis',{
  ref:'ThietBi',
  localField: '_id',
  foreignField: 'loaiThietBiID'
})

export default mongoose.model('LoaiThietBi', LoaiThietBiSchema)