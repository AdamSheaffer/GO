const errorHandlers = require('./handlers/errorHandlers');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/main');
const expressValidator = require('express-validator');
const app = express();
require('./handlers/passport');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(expressValidator());
app.use('/uploads', express.static(`${__dirname}/uploads/`));

if (app.get('env') === 'development') {
    app.use(express.static(`${__dirname}/client/dist/`));
    app.use('/account', authRoutes);
    app.use('/api', mainRoutes);
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/dist/index.html'));
    });
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(express.static(`${__dirname}/client/dist/`));
    app.use('/account', authRoutes);
    app.use('/api', mainRoutes);
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/dist/index.html'));
    });
    app.use(errorHandlers.productionErrors);
}

module.exports = app;