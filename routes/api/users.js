//* Routing logic

const express = require('express');

const router = express.Router();

const usersCtrl = require('../../controllers/api/users')

const ensureLoggedIn = require('../../config/ensureLoggedIn');

//dot notation is used here to access create function because it is exported in curly brackets
// pass it to the usersCtrl create  function
router.post('/', usersCtrl.create) 

router.post('/login', usersCtrl.login);

//using the ensured logged in, we protect the route
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;