const moogoose = require('mongoose');

const UserSchema = new moogoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = moogoose.model('user', UserSchema);