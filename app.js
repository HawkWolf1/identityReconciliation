const express = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')
const app = express() 
const fs = require('fs')
const path = require('path')

app.use(cors()) 

const helmet  =require('helmet')
const compression =require('compression')
const morgan = require('morgan')


// const userRoutes = require('./Routes/user')

const mongoConnect = require('./Util/database')
 

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {flags:'a'}
)

app.use(bodyParser.json({extended: false})) 

// app.use(userRoutes) 


app.use(compression())
app.use(morgan('combined', {stream: accessLogStream}))


mongoConnect(() =>{
    app.listen(4000)
})