const express = require('express');
const http = require('http');

const app = express();
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.json());
const server = http.createServer(app);

const loginRouter = require('./routes/login.js');
app.use('/login', loginRouter);

const signupRouter = require('./routes/signup.js');
app.use('/signup', signupRouter);

const propertyRouter = require('./routes/property.js');
app.use('/property', propertyRouter);

const dataRouter = require('./routes/data.js');
app.use('/data', dataRouter);

const housesRouter = require('./routes/houses.js');
app.use('/houses', housesRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
