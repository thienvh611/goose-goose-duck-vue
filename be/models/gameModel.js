const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var gameSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        players: [
            {
                player: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                character: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Character",
                },
                status: {
                    type: String,
                    default: "live"
                },
                no: Number
            }
        ],
        selectedCharacters: [
            {
                character: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Character",
                },
                quantity: Number
            }
        ]
        
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model("Game", gameSchema);
