const express = require('express');
const app = express();
const { PORT } = require('./utils/variables');

// DB Connection
require('./configs/database')

// Express Configs
require('./configs/express')(app)

// Set Routers
//require('./dispatcher')(app)

app.listen(PORT, 
    console.log(`Listening on port ${PORT}!`)
);


