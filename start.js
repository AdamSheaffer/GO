const env = require('dotenv').config({ path: 'variables.env' });
const mongoose = require('mongoose');
const app = require('./app');
const fileService = require('./handlers/fileService');
const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useMongoClient: true })
    .then(() => {
        console.log('💻 💻 💻 Connected to database');
    })
    .catch(err => {
        console.log(`❌ ❌ ❌ Could NOT connect to database: ${err}`);
    });

fileService.createContainer()
    .then(result => {
        console.log(`Container Created for ${result.name}`);
    })
    .catch(err => {
        console.log(`❌ ❌ ❌ Could NOT create Container: ${err}`);
    });

app.listen(port, () => {
    console.log(`👌 👌 👌 listening on port ${port}`);
});