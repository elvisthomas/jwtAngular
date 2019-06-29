const mongoose = require('mongoose');
var crypto = require('crypto');
var jwtService = require('jsonwebtoken');
const UsersSchema = mongoose.Schema({
    fullname: String,
    username: String,
    email: String,
    hash : String, 
    salt : String 
}, {
    timestamps: true
});

UsersSchema.methods.setPassword = function(password) { 
    this.salt = crypto.randomBytes(16).toString('hex'); 
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, `sha512`).toString(`hex`); 
}; 

UsersSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
};

UsersSchema.methods.generateAuthToken = function(){
    return jwtService.sign({ _id : this.id }, 'jwtPrimaryKey');
}

module.exports = mongoose.model('users', UsersSchema);