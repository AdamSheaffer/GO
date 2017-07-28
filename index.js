const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const env = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;

env.config({
    path: 'variables.env'
});

const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//app.use('/api', routes);

if (app.get('env') === 'development') {
    //app.use(errorHandlers.developmentErrors);
    app.use(express.static(`${__dirname}/client/dist/`));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/dist/index.html'));
    });
} else {
    //app.use(errorHandlers.productionErrors);
    app.use(express.static(`${__dirname}/public/`));
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