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
  if (!validateEmail(req.body)) {
    res.status(200).render('submit-mail-err')
  } else {
    let email = parseEmailFromRequest(req)
    writeEmailToDatabase(email)
    debug ? sendEmail(email) : placeEmailToQueue(email)
    return res.status(200).render('submit-mail-success')
  }
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
  email.setSubject(req.body.subject)
  email.setMessage(req.body.message)
  email.setSendOn(new Date(req.body['send_on']).getTime())

  return email
}

function validateEmail (email) {
  return !!email['from_email']
  && !!email['from_name']
  && !!email['to_email']
  && !!email['to_name']
  && !!email['subject']
  && !!email['message']
  && !!email['send_on']
  && new Date(req.body['send_on']) > Date.now()
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
  setTimeout(() => sendMail(email), howfar(new Date(), email.getSendOn))
}

function howfar(date1, date2) {
  // given date2 later than date 1
  return date2.getTime() - date1.getTime
}

function writeEmailToDatabase (email) {

}