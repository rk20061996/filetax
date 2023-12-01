const express = require('express');
const path = require('path');

const morgan = require('morgan');
const cors = require('cors');

const authRoute = require('./server/src/routes/auth.route');
const dataRoute = require('./server/src/routes/dataRoute.route');
const taxInformation = require('./server/src/routes/taxInformation.route');
const adminRoute = require('./server/src/routes/admin.route');

// const confirmRoute = require('./server/src/routes/confirmRoute.route');


const { httpLogStream } = require('./server/src/utils/logger');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/data', dataRoute);
app.use('/api/taxInformation', taxInformation);
app.use('/api/admin', adminRoute);

// app.use('/api/confirm-password', confirmRoute);


app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});


app.listen(9000);