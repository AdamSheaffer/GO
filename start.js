const env = require('dotenv').config({ path: 'variables.env' });
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 8080;

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