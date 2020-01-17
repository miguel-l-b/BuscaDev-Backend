const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const img = require('./img')

const Port = 8080

const app = express()

mongoose.connect('mongodb+srv://root:123@cluster0-2tzjk.mongodb.net/test?retryWrites=true&w=majority',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex :  true
})

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/img', img)
app.get('*', (req, res) => {
    res.send('<h1>Api DevBusca</h1> <style>body{ display: flex;flex-direction: row;align-items: center; text-align: center; } h1 { text-size: 25px; }</style>')
}) 

app.listen(process.env.PORT || Port)
console.log('Started | Port:'+process.env.PORT || Port)