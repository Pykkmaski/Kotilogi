const express = require('express');
const http = require('http');
const app = express();
const path = require('path');

app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.json());
const server = http.createServer(app);

const loginRouter = require('./routes/login.js');
app.use('/api/login', loginRouter);

const signupRouter = require('./routes/signup.js');
app.use('/api/signup', signupRouter);

const propertyRouter = require('./routes/properties/router.js');
app.use('/api/properties', propertyRouter);

const propertyImagesRouter = require('./routes/images.properties.js');
app.use('/api/images/properties', propertyImagesRouter);

const propertyFilesRouter = require('./routes/files.properties.js');
app.use('/api/files/properties', propertyFilesRouter);

const eventsRouter = require('./routes/events/router.js');
app.use('/api/events', eventsRouter);

const eventImagesRouter = require('./routes/images.events.js');
app.use('/api/images/events', eventImagesRouter);

const eventFilesRouter = require('./routes/files.events.js');
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

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
});

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
