const express = require('express')
const {
    registerUser,
    loginUser,
    getProfileDetails,
    getAllUser,
    addUser,
    deleteUser,
    updateUser,
   
} = require('../controller/userController')
const {
  authenticate
  } = require("../middleware/auth"); 
const router = express.Router()



router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route("/:user_id").get(getProfileDetails)

router.route("/").get(getAllUser);

router.route("/").post(addUser);

router.route("/:user_id").delete(deleteUser);

router.route("/:user_id").put(updateUser);


module.exports = router