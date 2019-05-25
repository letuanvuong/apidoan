'use strict'

import mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const GiangDuongSchema = new Schema(schema, options)

GiangDuongSchema.virtual('dsphongs',{
  ref: 'Phong',
  localField: '_id', 
  foreignField: 'giangDuongID'
})

export default mongoose.model('GiangDuong', GiangDuongSchema)