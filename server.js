const express = require('express');
const http = require('http');

const app = express();
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.json());
const server = http.createServer(app);

const loginRouter = require('./routes/login.js');
app.use('/login', loginRouter);

const signupRouter = require('./routes/signup.js');
app.use('/signup', signupRouter);

const propertyRouter = require('./routes/property.js');
app.use('/property', propertyRouter);

const propertyImageRouter = require('./routes/propertyImage.js');
app.use('/images', propertyImageRouter);

const propertyFileRouter = require('./routes/propertyFile.js');
app.use('/files', propertyFileRouter);

const dataRouter = require('./routes/data.js');
app.use('/data', dataRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
