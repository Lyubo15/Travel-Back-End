const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {

    // Body Pareser
    const jsonParser = bodyParser.json()
   
    app.use(express.json({limit: '50mb'}));

    app.use(jsonParser)
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }))

    // Cors security
    app.use(cors())

    // Token accessability
    app.use(function(req, res, next){
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })
}