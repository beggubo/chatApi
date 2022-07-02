import http from 'http'
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import routes from './routes'

const port = process.env.PORT || 4002
const host = 'localhost'
var app  = express()
var server = http.createServer(app)


let corsOptions ={
    origin: "http://localhost:3000"
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({extended: true}))
app.use('/api/static',express.static(__dirname + '/public'));
routes(app)

app.get('*',(req,res)=>{
    res.status(200).send({message: "Welcome API UNITY"})
})

server.listen(port,host,()=>{
    console.log(`Server is runing  http://${host}:${port}/`)
})