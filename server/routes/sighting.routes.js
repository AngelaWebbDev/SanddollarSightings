const SightingController = require('../controllers/sighting.controller')

module.exports = (app) => {
    //**Read** read all sightings
    app.get('/api/allSightings', SightingController.getAllSightings);
    
    //**Read** read one sighting by _id
    app.get('/api/oneSightingById/:id', SightingController.getOneById)
    
    //**Create** add new sighting
    app.post('/api/newsighting',SightingController.addSighting);

    //**Update** update a sighting (by id)
    app.put('/api/edit/:id', SightingController.updateSighting)

    //**Delete** delete a sighting (by id)
    app.delete('/api/oneSightingById/:id', SightingController.deleteSighting)
}