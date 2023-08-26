/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 3
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    profilePicture:{
        type: String
    },
    description:{
        type: String
    },
    verified:{
        type: Boolean
    },
    isAdmin:{
        type: Boolean
    }
})

// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this // binds this to the User model

	// First find the user by their username
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return 'user';  // no user found
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user);
				} else {
					resolve('password'); // wrong password
				}
			})
		})
	})
}

// Allows us to find a User document by the username
UserSchema.statics.findByUsername = function(username) {
    const User = this // 

    return User.findOne({username: username}).then((user) => {
        if(!user) {
            return Promise.reject()
        }
        return new Promise.resolve(user)
    })
}

// Make a model using the User Schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }
