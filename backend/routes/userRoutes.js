const express = require("express");
const { registerUser, loginUser, logoutUser, getUser, getLoginStatus, updateUser, updatePhoto } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser",protect, getUser);
router.get("/getloginstatus", getLoginStatus);
router.patch("/updateuser",protect, updateUser);
router.patch("/updatephoto",protect, updatePhoto);


module.exports = router