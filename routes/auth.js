const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');
const express = require('express');
const passport = require('passport');
const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.get('/verifytoken/:token', catchErrors(userController.verifyResetToken));

router.post('/register',
    userController.validateRegister,
    catchErrors(userController.register),
    userController.login);
router.post('/login', requireLogin, userController.login);
router.post('/forgot', catchErrors(userController.forgot));
router.post('/reset/:token',
    userController.confirmedPasswords,
    catchErrors(userController.update));



module.exports = router;