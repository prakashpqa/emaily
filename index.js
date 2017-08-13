const express = require('express');
const mongoose = require('mongoose');
require('./models/User');
require('./services/passport');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);
const app = express();

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
    "use strict";
    res.send({
        Hi: 'there'
    });
});

// Taking this port no from Heroku runtime during the final stages of the deployment.
const PORT = process.env.PORT || 5555;
app.listen(PORT);
// http://localhost:5555