'use strict'

let express = require('express')

let app = express()

app.set('port',8000)
app.set('view engine','ejs')

app.get('/',(req, res) => {
    res.status(200).render('index')
})

app.listen(app.get('port'),() =>{
    console.log(`app listening at http://localhost:${app.get('port')}`)
})