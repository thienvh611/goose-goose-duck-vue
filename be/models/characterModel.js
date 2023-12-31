const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var characterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model("Character", characterSchema);
