//creating the routing path from where we get the request and response
var express = require('express');
var jwt = require('jsonwebtoken');
var router=express.Router();

var controller=require('../controllers/controller');

var app=express();
app.set('superSecret','ionic-token-demo');


//registring the user in the backend
router.route('/v1/user/createUser').post(controller.createUser);

//authenticate the user and generate the token for the valid user
router.route('/v1/user/authenticateUser').post(controller.authenticateUser);

router.route('/v1/user/verifyEmail').get(controller.verifyEmailAddress);

router.use(function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (token) {
      console.log(token);
      console.log(app.get('superSecret'));
      jwt.verify(token, app.get('superSecret'), function (err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: err.name
          });
        }
       
        else {
          req.decoded = decoded;
          console.log("before decode")
          console.log(req.decoded)
          next();
        }
      });
     
    } 
    else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });

//uploading the user image
router.route('/v1/user/uploadUserImage').post(controller.uploadUserImage);

//updating the user information
router.route('/v1/user/updateUserInfo').post(controller.updateUserDetails);

//requesting for the user list details
router.route('/v1/user/getUserList/:seed/:page/:result').get(controller.getUserCompleteList);

module.exports=router;