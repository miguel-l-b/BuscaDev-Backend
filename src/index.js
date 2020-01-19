const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')

const routes = require('./routes')
const { setupWebsocket } = require('./websocket')

const Port = 8080

const app = express()
const server = http.Server(app)


setupWebsocket(server)

mongoose.connect('mongodb+srv://root:123@cluster0-2tzjk.mongodb.net/test?retryWrites=true&w=majority',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex :  true
})

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(express.static('img'))

Server.listen(process.env.PORT || Port)
console.log('Started | Port:'+process.env.PORT || Port)