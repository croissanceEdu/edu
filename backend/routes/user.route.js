const router = require('express').Router();
const { Mongoose } = require('mongoose');
const { classLinkController,getUsersController,getUsersByIdController } = require('../controller/user.controller');

let User = require('../models/auth.model');



router.post('/classlink',classLinkController);
router.post('/get',getUsersController);
router.post('/getbyid',getUsersByIdController);

//for test

// router.get('/users',(req, res) => {
//     User.find()
//       .then(user => res.json(user))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
//

module.exports= router
