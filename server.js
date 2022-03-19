const express = require('express')
const bodyParser = require('body-parser')

const route = require('./routes/route')

const app = express()

app.use(express.json())
app.use(bodyParser.json())

require("dotenv").config();


const PORT = process.env.PORT || 3000



app.use('/route', route)


app.get('/',(req,res)=>{
    res.send('hello word')
})

app.listen(PORT, ()=>{
    console.log(`Connection Made On Port ${PORT}`)
})
