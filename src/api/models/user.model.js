const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, default: 'user', enum: ['admin', 'user', 'moderator']}
    }
);

// const User = mongoose.model('user', userSchema);

// module.exports = User;

module.exports = mongoose.model('user',userSchema);