import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user','admin','legend'],
        default: 'user'
    },
    favourites: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '',
    }

})


export default mongoose.model('useras', UserSchema);