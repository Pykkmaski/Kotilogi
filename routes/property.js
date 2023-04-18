const router = require('express').Router();
const checkAuth = require('../middleware/checkAuth');
const db = require('../dbconfig');
const upload = require('../middleware/imageUpload');
const path = require('path');

router.get('/all/:username', checkAuth, async (req, res) => {
    try{
        const username = req.params.username;
        const properties = await db('properties').where({owner: username});
        res.status(200).send(JSON.stringify(properties));
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/:id', checkAuth, async (req, res) => {
    try{
        const id = req.params.id;
        const property = await db('properties').where({id}).first();
        if(!property) throw new Error(`Property with ID ${id} does not exist!`);
        res.status(200).send(JSON.stringify(property));
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/:id/events', checkAuth, async (req, res) => {
    try{
        const id = req.params.id;
        const history = await db('property_events').where({property_id: id}).orderBy('date', 'asc');
        if(!history.length) throw 404;
        if(history[0].owner !== req.authUser.username) throw 403; //This will not work yet, as there is no owner field for property events entries.
        res.status(200).send(JSON.stringify(history));
    }
    catch(err){
        console.log(err);
        res.sendStatus(err);
    }
});

router.get('/events/:id', checkAuth, async (req, res) => {
    try{
        const id = req.params.id;
        console.log(id);
        const event = await db('property_events').where({id}).first();
        if(!event) throw 404;
        res.status(200).send(JSON.stringify(event));
    }
    catch(err){
        if(typeof(err) !== 'number'){
            console.log(err.message);
            res.sendStatus(500);
            return;
        }

        res.sendStatus(err);
    }
});

router.get('/:id/image/main', async (req, res) => {
    const {id} = req.params;

    try{
        const filename = await db.select('filename').from('image_map').where({property_id: id}).first() // Change this to actually get the image labeled as property main.
        console.log(filename, id);
        if(!filename) throw 404;
        res.status(200).sendFile(path.join(__dirname, `../uploads/${filename.filename}`));
    }
    catch(err){
        if(typeof(err) === 'number'){
            res.sendStatus(err);
        }
        else{
            console.log(err.message);
            res.sendStatus(500);
        }
    }
});

router.put('/events/:id', checkAuth, async (req, res) => {
    try{
        const {id} = req.params;
        const data = req.body;
        await db('property_events').where({id}).update(data);
        res.sendStatus(200);
    }
    catch(err){
        if(typeof(err) !== 'number') {
            console.log(err.message);
            res.sendStatus(500);
            return;
        }

        res.sendStatus(err);
    }
});

router.get('/:id/energy', checkAuth, async (req, res) => {
    try{
        throw new Error('Under construction');
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

router.post('/', checkAuth, async (req, res) => {
    try{
        const data = req.body;
        await db('properties').insert(data);
        res.status(200).send();
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

router.post('/:id/events', checkAuth, async (req, res) => {
    try{
        const id = req.params.id;
        const {name, description, date} = req.body;

        const property = await db('properties').where({id}).first();
        if(!property) throw 403;

        await db('property_events').insert({
            name, description, date, property_id: id
        });

        res.sendStatus(200);
    }
    catch(err){
        if(typeof(err) === 'number'){
            res.sendStatus(err);
        } 
        else{
            console.log(err.message);
            res.sendStatus(500);
        }
        
    }
});

router.delete('/:property_id', checkAuth, async (req, res) => {
    try{
        const {property_id} = req.params;
        await db('properties').where({id: property_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/:property_id/events/:event_id', checkAuth, async (req, res) => {
    try{
        const {property_id, event_id} = req.params;
        const event = await db('property_events').where({property_id, id: event_id}).first();

        if(!event) throw 404;
        res.status(200).send(JSON.stringify(event));
    }
    catch(err){
        if(typeof(err) === 'number'){
            res.sendStatus(err);
        }
        else{
            console.log(err.message);
            res.sendStatus(500);
        }

    }
});

router.delete('/:property_id/events/:event_id', checkAuth, async (req, res) => {
    try{
        const {property_id, event_id} = req.params;
        await db('property_events').where({property_id, id : event_id}).del();
        res.sendStatus(200);
    }
    catch(err){
        if(typeof(err) === 'number'){
            res.sendStatus(err);
        } 
        else{
            console.log(err.message);
            res.sendStatus(500);
        }
    }
});

router.post('/:id/upload', upload.single('image'), async (req, res) => {
    res.status(200).send('Image uploaded');
})


module.exports = router;