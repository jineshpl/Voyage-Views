/* Destination mongoose model */
const mongoose = require('mongoose')

const DestinationSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    sightSeeingLocations: {
        type: Array,
        required: true
    }
})

const Destination = mongoose.model('Destination', DestinationSchema)

module.exports = {Destination}