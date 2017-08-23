const Trip = require('../models/Trip');
const User = require('../models/User');
const Badge = require('../models/Badge');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const fs = require('fs');
const photoDir = './uploads/';

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: 'That filetype isn\'t allowed' }, false);
        }
    },
};

exports.upload = multer(multerOptions).array('photos');

exports.resize = async (req, res, next) => {
    if (!req.files || !req.files.length) {
        return next();
    }

    const promises = [];
    req.body.photos = [];

    req.files.forEach(f => {
        const extension = f.mimetype.split('/')[1];
        const fileName = `${uuid.v4()}.${extension}`;
        req.body.photos.push(fileName);

        const promise = jimp.read(f.buffer)
            .then(photo => photo.resize(800, jimp.AUTO))
            .then(photo => photo.write(photoDir + fileName));

        promises.push(promise);
    });
    await Promise.all(promises);
    next();
};

exports.postNewTrip = async (req, res) => {
    let { trip } = req.body;
    if (!trip) {
        return res.json({ success: false, message: 'You must include a trip object' });
    }

    trip = JSON.parse(trip);
    trip.tripDate = new Date(trip.tripDate);

    if (!trip.rating || !trip.tripDate || !trip.park) {
        return res.json({ success: false, message: 'Trip is missing required fields' });
    }

    trip.user = req.user._id;
    trip.photos = req.body.photos;
    await (new Trip(trip)).save();
    const tripsPromise = Trip.find({ user: req.user._id });
    const userPromise = User.findById(req.user._id);
    const [trips, user] = await Promise.all([tripsPromise, userPromise]);
    const badge = await checkBadges(trips);
    if (badge) user.badges.push(badge);
    await user.save();
    return res.json({ success: true, message: 'Trip Saved!', badge });
};

exports.getUserTrips = async (req, res) => {
    const trips = await Trip.find({ user: req.user._id }).populate('park');

    if (!trips) {
        return res.json({ success: false, message: 'No trips found!' });
    }

    return res.json({ success: true, trips });
};

const checkBadges = (trips) => {
    // first trip badge
    if (trips.length === 1) {
        return Badge.findOne({ name: 'First Park' });
    }
}

exports.getUserTrip = async (req, res) => {
    const tripId = req.params.id;

    if (!tripId) return res.json({ success: false, message: 'You must supply a trip id' });

    const trip = await Trip.findOne({ _id: tripId });

    if (!trip) return res.json({ success: false, message: 'No trip was found with that id' });
    if (!trip.user.equals(req.user._id)) return res.json({ success: false, message: 'You are not authorized to view that trip' });

    return res.json({ success: true, trip });
}

exports.deleteTrip = async (req, res) => {
    const tripId = req.params.id;

    if (!tripId) {
        return res.json({ success: false, message: 'You must supply a trip id' });
    };

    const trip = await Trip.findOne({ _id: tripId, user: req.user._id });

    // Check if trip has photos
    if (trip.photos && trip.photos.length) {
        trip.photos.forEach(p => fs.unlink(photoDir + p));
    }

    await Trip.findByIdAndRemove(tripId);

    return res.json({ success: true, message: 'Trip Deleted' });
}
