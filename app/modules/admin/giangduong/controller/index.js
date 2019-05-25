'use strict'

import mongoose from 'mongoose'

const GiangDuong = mongoose.model('GiangDuong')

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
            item = await GiangDuong.create(data)
        } else {
            item = await GiangDuong.findByIdAndUpdate(data._id, {
                ten: data.ten,
                quanLyID: data.quanLyID,
                soTang: data.soTang,
                hinhAnhs: data.hinhAnhs
            })
        }
        return item
    } catch (error) {
        throw (error)
    }
}


const get = async (request, h) => {
    return await GiangDuong.find().populate([
        {
            path:'dsphongs',
            populate: [{ path: 'thietBis.item' }]
        },
        { path: 'quanLyID' }
    ]).lean()
}

const Delete = async (request, h) => {
    return await GiangDuong.findOneAndRemove({ _id: request.params.id })
}

// const get = async (request, h) =>{
//     return await GiangDuong.find()
// }

const getByid = async (request, h) => {
    return await GiangDuong.findById({ _id: request.params.id })
}

export default { save, get, getByid, Delete }