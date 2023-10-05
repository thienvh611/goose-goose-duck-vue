const Character = require("../models/characterModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

// Create a Character object
const createCharacter = asyncHandler(async (req, res) => {
    /**
     * TODO:Get the email from req.body
     */
    const name = req.body.name;
    /**
     * TODO:With the help of username find the user exists or not
     */
    const findCharacter = await Character.findOne({ name: name });

    if (!findCharacter) {
        /**
         * TODO:if user not found user create a new user
         */
        const newCharacter = await Character.create(req.body);
        res.json(newCharacter);
    } else {
        /**
         * TODO:if user found then thow an error: User already exists
         */
        throw new Error("Character Already Exists");
    }
});

// Get all characters
const getAllCharacters = asyncHandler(async (req, res) => {
    try {
        const name = req.query.name;
        const getCharacters = await Character.find({
            name: { $regex: name, $options: "i" },
        });
        res.json(getCharacters);
    } catch (error) {
        throw new Error(error);
    }
});

// Get a character
const getCharacter = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const getCharacter = await Character.findById(id);
        res.json({
            data: getCharacter,
        });
    } catch (error) {
        throw new Error(error);
    }
});

const filterCharacters = asyncHandler(async (req, res) => {
    try {
        const type = req.query.type;
        const filteredCharacters = await Character.find({
            type: { $regex: type, $options: "i" },
        });
        res.json({
            filteredCharacters,
        });
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createCharacter,
    getAllCharacters,
    getCharacter,
    filterCharacters
};
