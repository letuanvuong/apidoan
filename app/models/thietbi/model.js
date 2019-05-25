'use strict'

import mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const ThietBiSchema = new Schema(schema, options)

ThietBiSchema.virtual('dsphongsudung',{
  ref: 'Phong',
  localField: '_id',
  foreignField:'thietBis.item'
})

export default mongoose.model('ThietBi', ThietBiSchema)