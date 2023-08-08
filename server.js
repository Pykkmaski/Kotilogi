const express = require('express');
const http = require('http');
const app = express();
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.json());
const server = http.createServer(app);

const loginRouter = require('./routes/login.js');
app.use('/api/login', loginRouter);

const signupRouter = require('./routes/signup.js');
app.use('/api/signup', signupRouter);

const propertyRouter = require('./routes/properties.js');
app.use('/api/properties', propertyRouter);

const propertyImagesRouter = require('./routes/propertyImages.js');
app.use('/api/images/properties', propertyImagesRouter);

const propertyFilesRouter = require('./routes/propertyFiles.js');
app.use('/api/files/properties', propertyFilesRouter);

const eventsRouter = require('./routes/events.js');
app.use('/api/events', eventsRouter);

const eventImagesRouter = require('./routes/eventImages.js');
app.use('/api/images/events', eventImagesRouter);

const eventFilesRouter = require('./routes/eventFiles.js');
app.use('/api/files/events', eventFilesRouter);

const usageRouter = require('./routes/usage.js');
app.use('/api/usage', usageRouter);

const imagesRouter = require('./routes/images.js');
app.use('/api/images/', imagesRouter);

const resetRouter = require('./routes/reset.js');
app.use('/api/reset', resetRouter);

const usersRouter = require('./routes/users.js');
app.use('/api/users', usersRouter);

const contactRoute = require('./routes/contact.js');
app.use('/api/contact', contactRoute);

try{
    if(process.env.NODE_ENV !== 'test'){
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
    }
}
catch(err){
    console.log('Server is alrready running!');
}


module.exports = server;
