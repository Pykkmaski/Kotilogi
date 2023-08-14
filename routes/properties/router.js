const router = require('express').Router();
const checkAuth = require('../../middleware/checkAuth');
const checkPropertyAuth = require('../../middleware/checkPropertyAuth');
const db = require('../../dbconfig');
const RouteHandleError = require('../../Functions/Util/RouteHandleError');

const getAllPropertiesByEmail = require('./getAllPropertiesByEmail');
const getPropertyById = require('./getPropertyById');
const getEventsByPropertyId = require('./getEventsByPropertyId');
const postEventByPropertyId = require('./postEventByPropertyId');
const postProperty = require('./postProperty');
const deletePropertyById = require('./deletePropertyById');
const updatePropertyById = require('./updatePropertyById');

router.get('/', checkAuth, checkPropertyAuth, async (req, res) => {
    ///If request property_id is defined, responds with the property with the given id. Otherwise responds with all properties belonging to the authorized user making the request.
    try{
        const {user} = req;
        const {property_id} = req.body;
        const properties = !property_id ? await db('properties').where({owner: user.email}).orderBy('created_at', 'desc') : await db('properties').where({id: property_id});
        res.status(200).send(JSON.stringify(properties));

    }catch(err){
        RouteHandleError(err, res);
    }
});

router.get('/user/:email', checkAuth, getAllPropertiesByEmail);
router.get('/:property_id', checkAuth, getPropertyById);
router.get('/:property_id/events', checkAuth, checkPropertyAuth, getEventsByPropertyId);

router.post('/:property_id/events', checkAuth, postEventByPropertyId);
router.post('/', checkAuth, postProperty);

router.delete('/:property_id', checkAuth, checkPropertyAuth, deletePropertyById);

router.put('/:property_id', checkAuth, checkPropertyAuth, updatePropertyById);


module.exports = router;