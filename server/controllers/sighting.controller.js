const Sighting = require('../models/sighting.model')

module.exports = {

    //create new sighting
    addSighting: (req, res) => {
        Sighting.create(req.body)
                .then(newSighting => res.status(200).json(newSighting))
                .catch(err => res.status(500).json(err))
    },

    getAllSightings: (req, res) => {
        Sighting.find({})
            .then(sightings => {
                res.status(200).json(sightings);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    getOneById: (req, res) => {
        Sighting.findOne({_id: req.params.id})
                .then(sighting => {
                    res.status(200).json(sighting);
                })
                .catch(err => {
                    res.status(500).json(err)
                })
    },

    updateSighting: (req, res) => {
        Sighting.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
        .then(updatedSighting => res.status(200).json(updatedSighting))
        .catch(err => {console.log('updateSighting err: ', err);
                        res.status(500).json(err)})
    },

    deleteSighting: (req, res) =>{
        Sighting.deleteOne({ _id: req.params.id })
        .then(confirmMsg => res.status(200).json(confirmMsg))
        .catch(err => {console.log('deleteOne err: ', err);
                        res.status(500).json(err)})
    }
}