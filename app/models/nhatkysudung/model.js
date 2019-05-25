'use strict'

import mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const NhatKySuDungSchema = new Schema(schema, options)

export default mongoose.model('NhatKySuDung',NhatKySuDungSchema)