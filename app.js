'use strict'

require('dotenv').config()

let Email = require('./models/email')
let nodemailer = require('nodemailer')

let express = require('express')
var bodyParser = require('body-parser')
var urlencodeParser = bodyParser.urlencoded({extended: false})

let app = express()
let debug = false

app.set('port', process.env.PORT)
app.set('view engine', 'ejs')

// chỉ định thư mục static
app.use(express.static(`${__dirname}/public`))

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.status(200).render('index')
})

app.post('/sendMail', urlencodeParser, function (req, res) {
  if (debug) console.log('got send email request')
  let email = parseEmailFromRequest(req)
  validateEmail(email)
  writeEmailToDatabase(email)
  debug ? sendEmail(email) : placeEmailToQueue(email)
  res.status(200).render('submit-mail-success')

})

app.listen(app.get('port'), () => {
  console.log(`app listening at http://localhost:${app.get('port')}`)
})

function parseEmailFromRequest (req) {
  let email = new Email()

  email.setFrom(req.body.from_email)
  email.setFromName(req.body.from_name)
  email.setTo(req.body.to_email)
  email.setToName(req.body.to_name)

  return email
}

function validateEmail () {
  return true
}

function sendMail (email) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'thuguituonglai45102@gmail.com',
      pass: '135792468abc'
    }
  })

  var mailOptions = {
    from: email.getFrom(),
    to: email.getTo(),
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

function placeEmailToQueue (email) {
  setTimeout(() => sendMail(email), 1000)
}

function writeEmailToDatabase (email) {

}