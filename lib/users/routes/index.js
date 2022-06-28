var express = require('express');
var router = express.Router();
var { signUp, signIn, getProfile , signOut} = require('../../users/controller');
const auth = require("../../auth-services");

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/signout', signOut);

router.get('/profile', auth.verifyUser , getProfile);


module.exports = router;