const Trip = require('../models/Trip');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

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
            .then(photo => photo.write(`./uploads/${fileName}`));

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
    const newTrip = await (new Trip(trip)).save();
    return res.json({ success: true, message: 'Trip Saved!', trip });
}

