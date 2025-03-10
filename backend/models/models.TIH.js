// model  contains data from api as well as user's comments:ask chatgpt
// db will save the data from api
// i think for mvp do not implement the auto update shit

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the Attraction schema
const TIHDocumentSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        categoryDescription: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            default: 0,
            required: true,
        },
        pricing: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        imagesUuid: [
            {
                type: String,
            },
        ],
        website: {
            type: String,
            default: '',
        },
        userReviews: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Review',
            default: [],
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Attraction model
const TIHDocument = model('TIHData', TIHDocumentSchema);

export default TIHDocument;
