const express = require('express')
const { graphqlHTTP} = require('express-graphql')
const {schema, resolver} = require('./schema')
const logger = require('morgan')
const cors = require("cors")
const app = express();
const http = require('http');
const server = http.createServer(app);
let port = 4001

let corsOptions = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(logger('dev'))
app.use('/api/static/',express.static(__dirname + '/public'))
app.use('/graphql',graphqlHTTP((request, response, graphQLParams)=>({
    schema,
    rootValue: resolver,
    graphiql: true,
    context:{
        request,
        response
    },
}))
);

server.listen(port,()=>{
    console.log(`Server runing`)
})
