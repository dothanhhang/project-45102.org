'use strict'

let express = require('express')
var bodyParser = require('body-parser');

let app = express()

app.set('port',8000)
app.set('view engine','ejs')

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Đây là thủ thuật để đưa đường dẫn vào trong thư mục bất kỳ

app.get('/',(req, res) => {
    res.status(200).render('index')
})

app.get('/sendMail',  (req,res)=> {
    console.log('get request for /')
    res.send('Hellooooooooooo')
})

app.listen(app.get('port'),() =>{
    console.log(`app listening at http://localhost:${app.get('port')}`)
})
