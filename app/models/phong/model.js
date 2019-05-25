'use strict'

import mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const PhongSchema = new Schema(schema, options)

PhongSchema.virtual('dsnhatkyphanhoiphongthietbi',{
  ref: 'NhatKyPhanHoi',
  localField: '_id',
  foreignField:'phongID'
})

export default mongoose.model('Phong', PhongSchema)