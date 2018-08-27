const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

module.exports = {
    login : (req, res) => {
        const {email, password} = req.body;
        console.log("==========1===========")
        User.findOne({email : email})
            .then(user =>{
                console.log("==========2===========")
                let isTrue =  bcrypt.compareSync(password, user.password)
                if(isTrue){
                    console.log("==========3===========")
                    let token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY)
                    res.status(200).json({
                        message: 'successfully logged in', 
                        token,
                        user
                    })
                }else{
                    console.log("==========4===========")
                    res.status(404).json({
						message: "email/password is invalid"
					});
                }
            })
            .catch(err=>{
                console.log("==========5===========")
                res.status(400).json({
                    message: "invalid email/password",
                    err
				});
            })
    },

    signup : (req, res) =>{
        console.log("==========6===========")
        const {name, email, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        User.create({
            name, 
            email,
            password : hash
        })
        .then(user=>{
            console.log("==========7===========")
            res.status(201).json({
                message: 'successfully registered',
                user,
            })
        })
        .catch(err=>{
            console.log("==========8===========")
            res.status(400).json({
                message: "invalid email/password",
                err
            });
        })
    }

}