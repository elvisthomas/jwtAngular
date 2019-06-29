const Users = require('../models/users.model.js');
exports.create = (req, res) => { // SIGNUP
    let postData = req.body;
    let newUser = new Users(); 
    newUser.fullname = postData.fullname, 
    newUser.username = postData.username,
    newUser.email = postData.email 
    newUser.setPassword(postData.matching_passwords.password); 
    newUser.save((err, data) => { 
        if (err) { 
            return res.json({ status:500, message : "Failed to create account.", data: err }); 
        } 
        else { 
            return res.json({ status:200, message : "Account created succesfully.", data: data }); 
        } 
    }); 
};
exports.doSignin = (req, res) => { // DO SIGNIN
    Users.findOne({ email : req.body.email }, function(err, data) { 
        if (data === null) { 
            return res.json({ status: 400, message: 'Email not found', data: err });
        } 
        else { 
            if (data.validPassword(req.body.password)) { 
                const token = data.generateAuthToken();
                return res.json({ status: 200, message: 'loggedin Successfully', data: data, token: token });
            } 
            else { 
                return res.json({ status: 400, message: 'Wrong Password', data: data });
            } 
        } 
    }); 
};
exports.getUsername = (req, res) => { // GET THE USERNAME FOR CHECKING EXISTING
    let username = req.param('username');
    Users.findOne({ username: username }, function (err, data) {
        if(err){
            return res.json({ status: 500, message: 'Some error occrred while getting the username.', data: err });
        }else{
            return res.json({ status: 200, message: 'Get the username successfully.', data: data });
        }
    });
}
