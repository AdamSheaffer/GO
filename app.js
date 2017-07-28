const errorHandlers = require('./handlers/errorHandlers');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const env = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index')(router);
const port = process.env.PORT || 8080;
const app = express();

env.config({
    path: 'variables.env'
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

if (app.get('env') === 'development') {
    app.use(cors({
        origin: 'http://localhost:4200'
    }));
    app.use(errorHandlers.developmentErrors);
    app.use(express.static(`${__dirname}/client/dist/`));
    app.use('/api', routes);
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/dist/index.html'));
    });
} else {
    app.use(errorHandlers.productionErrors);
    app.use(express.static(`${__dirname}/public/`));
    app.use('/api', routes);
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
}


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, (err) => {
    if (err) {
        console.log(`❌ ❌ ❌ Could NOT connect to database: ${err}`);
    } else {
        console.log('💻 💻 💻 Connected to database');
    }
});

app.listen(port, () => {
    console.log(`👌 👌 👌 listening on port ${port}`);
});