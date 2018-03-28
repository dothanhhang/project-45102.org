'use strict'

require('dotenv').config()

let Email = require('./models/email')
let mailler = require('nodemailer')

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

  email.setFromName(req.body.from_name)
  email.setFromName(req.body.from_email)
  email.setFromName(req.body.to_name)
  email.setFromName(req.body.to_email)

  return email
}

function validateEmail () {
  return true
}

function sendMail (email) {

}

function placeEmailToQueue (email) {
  setTimeout(10, () => sendMail(email))
}

function writeEmailToDatabase () {

}