import mongoose from 'mongoose'

const temporaryUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    firebaseUuid: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the current timestamp when the document is created
    },
});

// Create a TTL index that expires after 1 hour (3600 seconds)
temporaryUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const TemporaryUser = mongoose.model('TemporaryUser', temporaryUserSchema);
export default TemporaryUser