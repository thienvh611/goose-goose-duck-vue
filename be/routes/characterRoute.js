const express = require("express");
const router = express.Router();

const {
    createCharacter,
    getAllCharacters,
    getCharacter,
    filterCharacters,
} = require("../controller/characterController");

router.post("/create", createCharacter);
router.get("/get-all-characters", getAllCharacters);
router.get("/filter", filterCharacters);
router.get("/:id", getCharacter);

module.exports = router;