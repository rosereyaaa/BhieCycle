const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"],
    },

    description: {
        type: String,
        required: [true, "Please enter product description"],
    },

    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [5, "Product name cannot exceed 5 characters"],
        default: 0.0,
    },

    images: [
        {
            public_id: {
                type: String,
                required: true,
            },

            url: {
                type: String,
                required: false,
            },
        },
    ],

    ratings: {
        type: Number,
        default: 0,
    },

    numOfReviews: {
        type: Number,
        default: 0,
    },

    reviews: [
        {
            // user: {
            //     type: mongoose.Schema.ObjectId,
            //     ref: 'User',
            //     required: true
            // },

            name: {
                type: String,
                required: true,
            },

            rating: {
                type: Number,
                required: true,
            },

            comment: {
                type: String,
                required: true,
            },
        },
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Service", serviceSchema);