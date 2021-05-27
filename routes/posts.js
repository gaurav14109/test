const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, postsController.create);//after validation den moving to next create action
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports = router;