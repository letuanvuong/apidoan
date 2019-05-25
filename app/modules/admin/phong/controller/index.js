'use strict'

import mongoose from 'mongoose'
import Boom from 'boom'
const Phong = mongoose.model('Phong')
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
            item = await Phong.create(data)
        } else {
            item = await Phong.findByIdAndUpdate(data._id, {
                tenPhong: data.tenPhong,
                sucChua: data.sucChua,
                tinhTrang: data.tinhTrang,
                hinhAnhs: data.hinhAnhs,
                giangDuongID: data.giangDuongID
            })
        }
        return item
    } catch (error) {
        throw (error)
    }
}

const saveThietBi = async request => {
    try {
        let { payload } = request
        let phong = await Phong.findById(payload.phongId)
        if (!phong) {
            return Boom.notFound('Phong not found.')
        }
        if (!(Array.isArray(phong.thietBis) && phong.thietBis.length)) {
            phong.thietBis = []
        }
        if (payload._id) {
            let index = phong.thietBis.findIndex(item => String(item._id) === payload._id)
            if (index === -1) {
                return Boom.notFound('Khong tim thay thiet bi nay trong phong.')
            }
            let indexThietBi = phong.thietBis.findIndex(item => String(item.item) === payload.thietbiId)
            if (indexThietBi !== -1 && indexThietBi !== index) {
                return Boom.badRequest('Thiet bi da ton tai trong phong nay.')
            }
            phong.thietBis[index].item = payload.thietbiId
            phong.thietBis[index].tinhTrangSoLuong = payload.tinhTrangSoLuong
            // phong.thietBis[index].soLuong = payload.soLuong
            phong.thietBis[index].ghiChu = payload.ghiChu
        } else {
            let index = phong.thietBis.findIndex(item => String(item.item) === payload.thietbiId)
            if (index !== -1) {
                return Boom.badRequest('Thiet bi da ton tai trong phong nay.')
            }
            phong.thietBis.push({
                item: payload.thietbiId,
                tinhTrangSoLuong: payload.tinhTrangSoLuong,
                // tinhTrang: payload.tinhTrang,
                // soLuong: payload.soLuong,
                ghiChu: payload.ghiChu
            })
            
        }
       
        await phong.save()
        return true
    } catch (error) {
        return Boom.badRequest(error)
    }
}

// const get = async (request, h) =>{
//     return await Phong.find().populate([{path: 'giangDuongID'},{path: 'dsphongthietbis'}]).lean()
// }

const get = async (request, h) => {
    return await Phong.find().populate([
        { path: 'giangDuongID' },
        { path: 'dsnhatkyphanhoiphongthietbi' }
    ]).lean()
}

const Delete = async (request, h) => {
    return await Phong.findOneAndRemove({ _id: request.params.id })
}
//từ id lấy ra dược chi tiết trong id đó thì populate
const getByid = async (request, h) => {
    return await Phong.findById({ _id: request.params.id }).populate([{ path: 'giangDuongID' }, { path: 'thietBis.item' },{ path: 'dsnhatkyphanhoiphongthietbi' }]).lean()
}
// delete thiet bi trong phong
const DeleteThietbi = async (request, h) => {
    
    let phong = await Phong.findById(request.params.phongId)
    let index = phong.thietBis.findIndex(thietBi => String(thietBi._id) === request.params._id)
    if (index !== -1) {
        phong.thietBis.splice(index, 1)
    }
    await phong.save()
    return phong
}


export default { save, get, saveThietBi, Delete, getByid, DeleteThietbi }