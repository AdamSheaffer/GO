const errorHandlers = require('./handlers/errorHandlers');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/main');
const passport = require('passport');
const expressValidator = require('express-validator');
const app = express();
const router = express.Router();
require('./handlers/passport');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(expressValidator());

if (app.get('env') === 'development') {
    app.use(cors({
        origin: 'http://localhost:4200'
    }));
    app.use(errorHandlers.developmentErrors);
    app.use(express.static(`${__dirname}/client/dist/`));
    app.use('/auth', authRoutes);
    app.use('/api', mainRoutes);
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/dist/index.html'));
    });
} else {
    app.use(errorHandlers.productionErrors);
    app.use(express.static(`${__dirname}/public/`));
    app.use('/auth', authRoutes);
    app.use('/api', mainRoutes);
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
}

module.exports = app;