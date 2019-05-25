'user strict'

import mongoose from 'mongoose'
import { request } from 'https';

const ThietBi = mongoose.model('ThietBi')



const save = async (request, h) => {
    try {
        let data = request.payload
        //tách img bên payload form thành image và base64
        let base64 = data && data.hinhAnhs && data.hinhAnhs.imageURL
        //convert base64 to image------------------------------------------------
        if (base64 && base64.match(/data(.*?)base64,/)) {
            // data.hinhAnhs.imageURL = "app/lib/img/" + data.hinhAnhs.image
            let base64Data = base64.replace(/data(.*?)base64,/, "");
            require("fs").writeFile("app/lib/img/" + data.hinhAnhs.image, base64Data, 'base64', function (err) {
            });
            data.hinhAnhs = data.hinhAnhs.image
        }
        //--------------------------------------------------------------------------
        let item
        if (!data._id) {
            item = await ThietBi.create(data)
        } else {
            item = await ThietBi.findByIdAndUpdate(data._id, {
                tenThietBi: data.tenThietBi,
                hinhAnhs: data.hinhAnhs,
                moTa: data.moTa,
                loaiThietBiID: data.loaiThietBiID
            })
        }
        return item
    } catch (error) {
        throw (error)
    }
}

// const get = async (request, h)=>{
//   return await ThietBi.find().populate([{path:'loaiThietBiID'},{path:'dsphongthietbis'}]).lean()
// }

const get = async (request, h) => {
    return await ThietBi.find()
        .populate([{
            path: 'loaiThietBiID'
        }, {
            path: 'dsphongsudung'
        }])
        .lean()
}

const Delete = async (request, h) => {
    return await ThietBi.findByIdAndRemove({ _id: request.params.id })
}

export default { save, get, Delete }