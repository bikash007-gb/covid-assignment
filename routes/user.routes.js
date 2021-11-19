const express = require("express")
const userController = require("../controllers/user.controller")

const router = express.Router()

router.route("/user").post(userController.userEntry)
router.route("/report/:from/:to").get(userController.getUsers)
module.exports = router
