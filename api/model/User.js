const mongoose = require('mongoose')

// Schema is basically a object representation of the structure of the your data collection(Users) that use can define below later then you will create a model that can be then used to interact with your database with the help of mongoose. 

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    }, 
    followings: {
        type: Array,
        default: []
    }, 
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    }, 
    city: {
        type: String,
        max: 20
    },
    from: {
        type: String,
        max: 50
    },
    relationship: {
        type: String,
        enum: [1,2,3]
    }
},
    {timestamps: true}
);

// create a model and export it so that other modules like 
// user and auth can use it, because user and auth is where 
// we will be dealing with user stuffs

const User = mongoose.model('User', UserSchema);
module.exports = User;