var passwordHash = require('password-hash');

var User = require('../mongo-models/user');

module.exports = () => {
    var user = {};

    user.createUser = (req, res) => {
        console.log(req.body);
        User.findOne({ email: req.body.email }, (err, userInfo) => {
            if (userInfo == null) {
                var password = passwordHash.generate(req.body.password);
                var obj = {
                    name: req.body.name,
                    email: req.body.email,
                    contact: req.body.contact,
                    password: password
                }
                var user = new User(obj);   

                user.save((err, result) => {
                    console.log('result', result)
                    console.log(err)
                    if (err) {
                        res.json({ success: false, message: "Error in saving data" })
                    }
                    else {
                        res.json({ success: true, message: "User created successfully", data: result })
                    }
                })
            }
            else {
                res.json({ success: false, message: "Email ID allready exists." })
            }
        })
    },

    user.getAllUser = (req, res) => {
        console.log('reqbody', req)
        User.find((err, result) => {
            console.log('users res------------>>>>', res)
            if(res) {
                res.json({ success: true, message: "Users data fetch successfully", data: result })
            } else {
                res.json({ success: false, message: "Error in fetching users data" })
            }
        })
    }

    return user;
}