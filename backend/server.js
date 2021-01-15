const app = require('./app');
let morgan = require('morgan');

const mongoDB = require('./Database/mongoDB');
mongoDB.connect();
app.use(morgan('combined'))

const mins = 2 * 60 * 1000;

const port = '5000';
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

