'use strict'

// TODO: sử dụng file .env như của project TodayImDone

let Email = require('models/email')
let mailler = require('nodemailer')

let express = require('express')
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended: false})

let app = express()
let debug = false

//TODO: đọc PORT từ .env
app.set('port',8000)
app.set('view engine','ejs')

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Đây là thủ thuật để đưa đường dẫn vào trong thư mục bất kỳ

app.get('/',(req, res) => {
    res.status(200).render('index')
})

app.post('/sendMail',urlencodeParser, function (req, res) {
    if (debug) console.log('got send email request')
    let email = parseEmailFromRequest(req);
    validateEmail(email)
    writeEmailToDatabase(email)
    if (debug) sendEmail(email) else placeEmailToQueue(email)
    res.status(200).render('submit-mail-success')

})

app.listen(app.get('port'),() =>{
    console.log(`app listening at http://localhost:${app.get('port')}`)
})



function parseEmailFromRequest(req) {
    let email = new Email()

    email.setFromName(req.body.from_name)
    email.setFromName(req.body.from_email)
    email.setFromName(req.body.to_name)
    email.setFromName(req.body.to_email)

    return email
}

function validateEmail () {
    return true
}

function sendMail(email) {
    if (!email) return

    //TODO: đọc các cấu hình cần thiết để gửi dc mail từ .env
    //TODO: "enable smtp google mail"

}

function placeEmailToQueue(email) {
    setTimeout(10000000, () => sendMail(email))
}

function writeEmailToDatabase () {

}