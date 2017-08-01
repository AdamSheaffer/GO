const { catchErrors } = require('../handlers/errorHandlers');
const ticketsController = require('../controllers/ticketController');
const express = require('express');
const router = express.Router();

router.get('/tickets', catchErrors(ticketsController.getEvents));

module.exports = router;