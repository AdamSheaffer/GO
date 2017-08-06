const { catchErrors } = require('../handlers/errorHandlers');
const ticketsController = require('../controllers/ticketController');
const tripsController = require('../controllers/tripsController');
const passport = require('passport');
const express = require('express');
const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/tickets', catchErrors(ticketsController.getEvents));
router.get('/range', catchErrors(ticketsController.getEventsInRadius));
router.post('/trips',
    requireAuth,
    catchErrors(tripsController.postNewTrip));

module.exports = router;