var passwordHash = require('password-hash');

var User = require('../mongo-models/user');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('your_api_key');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');

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

                // create a token
                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                console.log('token---->', token)

                user.save((err, result) => {
                    console.log('result', result)
                    console.log(err)
                    if (err) {
                        res.json({ success: false, message: "Error in saving data" })
                    }
                    else {
                        // send mail using sendgrid
                        const msg = {
                            to: 'test1@dev.in',
                            from: 'test2@dev.in',
                            subject: 'Sending with SendGrid is Fun',
                            text: 'and easy to do anywhere, even with Node.js ',
                            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
                        };
                        sgMail.send(msg);

                        res.json({ success: true, message: "User created successfully", data: result, token: token })
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
                if (res) {
                    res.json({ success: true, message: "Users data fetch successfully", data: result })
                } else {
                    res.json({ success: false, message: "Error in fetching users data" })
                }
            })
        },

        user.fileUpload = (req, res, next) => {

            console.log('req', req.file)
            var obj = {
                success: true,
                message: 'file upload success'
            }
            res.json(obj)

        },

        user.getSingleUser = (req, res) => {
            console.log('req', req)
            var token = req.headers['x-access-token'];
            console.log('----token----', token)

            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

                res.status(200).send(decoded);
            });
        }

    return user;
}