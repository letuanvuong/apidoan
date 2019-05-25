const nodemailer = require("nodemailer")

const sendEmail = async request => {

  let {hoTen, email, soDienThoai, title, message} = request.payload
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'letuanvuongk57@gmail.com',
      pass: '01686741583'
    }
  })

  var mailOptions = {
    from: 'letuanvuongk57@gmail.com',
    to: 'vuonggl.it@gmail.com',
    subject: title,
    html: `<div>
        Họ tên: <strong>${hoTen}</strong>
      </div>
      <div>
        Email: <strong>${email}</strong>
      </div>
      <div>
        Số điện thoại: <strong>${soDienThoai}</strong>
      </div>
      <div>
        Tiêu đề: <strong>${title}</strong>
      </div>
      <div>
        Nội dung: <strong>${message}</strong>
      </div>`
  }

  let data = await transporter.sendMail(mailOptions)
  console.log(data)
  return {
    success: true
  }
}

export default {
  sendEmail
}