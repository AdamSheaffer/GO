const Trip = require('../models/Trip');
const User = require('../models/User');
const Badge = require('../models/Badge');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const difference = require('lodash/difference');
const uniq = require('lodash/uniq');
const moment = require('moment');
const photoDir = './uploads/';
const azure = require('azure-storage');
const fileService = require('../handlers/fileService');

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

        const promise = new Promise((resolve, reject) => {
            jimp.read(f.buffer).then(photo => {
                photo.resize(800, jimp.AUTO)
                    .write(photoDir + fileName, () => {
                        fileService.uploadLocalFile(fileName, photoDir + fileName)
                            .then(() => resolve())
                            .catch((error) => reject(error))
                    });
            });
        });

        promises.push(promise);
    });
    await Promise.all(promises);
    next();
};

exports.postNewTrip = async (req, res, next) => {
    let { trip } = req.body;
    if (!trip) {
        return res.json({ success: false, message: 'You must include a trip object' });
    }

    trip = JSON.parse(trip);
    trip.tripDate = new Date(trip.tripDate.replace(/-/g, '/'));

    if (!trip.rating || !trip.tripDate || !trip.park) {
        return res.json({ success: false, message: 'Trip is missing required fields' });
    }

    trip.user = req.user._id;
    trip.photos = req.body.photos;
    await (new Trip(trip)).save();
    next();
};

exports.checkBadges = async (req, res) => {
    const tripsPromise = Trip.find({ user: req.user._id }).populate('park');
    const userPromise = User.findById(req.user._id).populate('badges');
    const [trips, user] = await Promise.all([tripsPromise, userPromise]);
    const badges = await Promise.all(findBadges(trips, user));
    if (badges && badges.length) user.badges.push(...badges);
    await user.save();
    return res.json({ success: true, message: 'Trip Saved!', badges });
}

exports.getUserTrips = async (req, res) => {
    let trips = await Trip.find({ user: req.user._id }).populate('park');

    if (!trips) {
        return res.json({ success: false, message: 'No trips found!' });
    }

    return res.json({ success: true, trips });
};

const findBadges = (trips, user) => {
    const badgePromises = [];

    const dates = trips.map(t => t.tripDate).sort((a, b) => a.tripDate - b.tripDate);
    let hasBackToBack = false;
    for (const [i, date] of dates.entries()) {
        if (i + 1 >= dates.length) break;
        const curTripDate = moment(date);
        const nextDay = curTripDate.add(1, 'days');
        const nextTripDate = moment(dates[i + 1]);
        if (nextTripDate.isSameOrBefore(nextDay)) hasBackToBack = true;
    }

    if (hasBackToBack) {
        const name = 'Back 2 Back';
        const alreadyAquired = user.badges.findIndex(b => b.name === name) > -1;
        if (!alreadyAquired) badgePromises.push(Badge.findOne({ name }));
    }

    // first trip badge
    if (trips.length === 1) {
        const name = 'First Park';
        const alreadyAquired = user.badges.findIndex(b => b.name === name) > -1;
        if (!alreadyAquired) {
            badgePromises.push(Badge.findOne({ name }));
        };

    }

    // national league
    const nlCount = uniq(trips.filter(t => t.park.division.includes('National')).map(t => t.park.name)).length;
    if (nlCount === 15) {
        const name = 'National League Champion';
        const alreadyAquired = user.badges.findIndex(b => b.name === name) > -1;
        if (!alreadyAquired) {
            badgePromises.push(Badge.findOne({ name }));
        };
    }

    // american league
    const alCount = uniq(trips.filter(t => t.park.division.includes('American')).map(t => t.park.name)).length;
    if (alCount === 15) {
        const name = 'American League Champion';
        const alreadyAquired = user.badges.findIndex(b => b.name === name) > -1;
        if (!alreadyAquired) {
            badgePromises.push(Badge.findOne({ name }));
        };
    }

    // 100%
    const totalParkCount = uniq(trips.map(t => t.park.name)).length;
    if (totalParkCount === 30) {
        const name = 'World Champion';
        const alreadyAquired = user.badges.findIndex(b => b.name === name) > -1;
        if (!alreadyAquired) {
            badgePromises.push(Badge.findOne({ name }));
        };
    }

    return badgePromises;
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
        trip.photos.forEach(p => fileService.deleteFile(p));
    }

    await Trip.findByIdAndRemove(tripId);

    return res.json({ success: true, message: 'Trip Deleted' });
}

exports.parseTrip = (req, res, next) => {
    req.body.trip = JSON.parse(req.body.trip);
    next();
}

exports.validateTrip = (req, res, next) => {
    if (!req.body.trip) {
        return res.json({ success: false, message: 'You must include a trip object' });
    }

    req.body.trip.tripDate = new Date(req.body.trip.tripDate);

    if (!req.body.trip.rating || !req.body.trip.tripDate || !req.body.trip.park) {
        return res.json({ success: false, message: 'Trip is missing required fields' });
    }
    next();
}

exports.updateTrip = async (req, res, next) => {
    const { trip } = req.body;
    const oldTrip = await Trip.findById(trip._id);

    // Delete old photos
    const photosToDelete = difference(oldTrip.photos, trip.photos);
    photosToDelete.forEach(p => fileService.deleteFile(p));

    // Add new photos
    if (req.body.photos && req.body.photos.length) {
        trip.photos.push(...req.body.photos);
    }

    await oldTrip.update(trip);
    return res.json({ success: true, message: 'Trip Updated' });
}