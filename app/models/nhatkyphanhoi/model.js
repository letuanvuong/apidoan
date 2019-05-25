'use strict'

import mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const NhatKyPhanHoiSchema = new Schema(schema, options)


export default mongoose.model('NhatKyPhanHoi', NhatKyPhanHoiSchema)