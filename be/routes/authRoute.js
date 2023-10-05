const express = require("express");
const {
    createUser,
    loginUser,
    logout,
    getAllUsers,
    getUser
} = require("../controller/userController");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/get-all-users", getAllUsers);
router.get("/:id", getUser);

module.exports = router;
