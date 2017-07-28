const { catchErrors } = require('../handlers/errorHandlers');
const parkController = require('../controllers/parkController');

module.exports = (router) => {
    // Auth
    router.get('/test', parkController.getParks);

    return router;
}