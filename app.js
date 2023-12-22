const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const path = require('path');

const morgan = require('morgan');

const authRoute = require('./server/src/routes/auth.route');
const dataRoute = require('./server/src/routes/dataRoute.route');
const taxInformation = require('./server/src/routes/taxInformation.route');
const adminRoute = require('./server/src/routes/admin.route');

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

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('send_message', (data) => {
    console.log('data-->', data);
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: 'error',
    message: err.message,
  });
  next();
});

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
