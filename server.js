'use strict';

/* Server environment setup */
// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
const TEST_USER_ID = '5fb8b011b864666580b4efe3' // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
const TEST_USER_EMAIL = 'test@user.com'
//////

const log = console.log;

//Express server
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
app.use(bodyParser.json())

//CORS 
const cors = require('cors')
app.use(cors())

// MIME
app.use(express.static(__dirname));

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose')
const { Post } = require('./models/post')
const { Destination } = require('./models/destination')
const { User } = require('./models/user')

// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo'); // to store session information on the database in production
const { useRouteMatch } = require('react-router');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dhj4tfqt3',
    api_key: '344977459671374',
    api_secret: 'yeoyr7ByZKC3vi-2J0uLUXi7rho'
});

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (env !== 'production' && USE_TEST_USER)
        req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", 
		// make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: env === 'production' ? MongoStore.create({
                                                mongoUrl: process.env.MONGODB_URI || 'mongodb+srv://group:mark309@cluster0.zly4t.mongodb.net/test'
                                 }) : null
    })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

	// check mongoose connection
	if (mongoose.connection.readyState != 1) {
		console.log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

    // log(email, password);
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUsernamePassword(username, password)
        .then(user => {
			if (user === 'user') {
				// User not found
				res.send({status: 1, currentUser: undefined});
			} else if (user === 'password') {
				// Password is incorrect
				res.send({status: 2, currentUser: undefined});
			} else {

				// Add the user's id to the session.
				// We can check later if this exists to ensure we are logged in.
				req.session.user = user._id;
				req.session.username = user.username; 

				// we will later send the email to the browser when checking if someone is logged in 
				//through GET /check-session (we will display it on the frontend dashboard. 
				// You could however also just send a boolean flag).

				// Don't send back hashed password
				user.password = '';

				res.send({ status: 0, currentUser: user, isAdmin: user.isAdmin });
			}
        })
        .catch(error => {
            res.send({status: 3, currentUser: undefined});
        });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.send({status:1 , currentUser: req.session.user});
        } else {
            res.send({status:0 , currentUser: undefined});
        }
    });
});

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    if (env !== 'production' && USE_TEST_USER) { // test user on development environment.
        req.session.user = TEST_USER_ID;
        req.session.email = TEST_USER_EMAIL;
        res.send({ currentUser: TEST_USER_EMAIL })
        return;
    }

    if (req.session.user) {
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
    }
});


// helper function
function isMongoError(error) {
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// Post API Routes below 

/*
Route for adding a post
 
Request body expects:
{
	"username": <username>
	"caption": <post caption>
	"destination": <post destination>
	"sightseeingLocation": <post sightseeing location>
	"rating": <post rating>
	"postId": <postId>
}

*/
// Post /posts

app.post('/posts', multipartMiddleware, (req, res) => {

	cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {
            // Create a new image using the Image mongoose model
			const post = new Post({
				username: req.body.username,
				caption: req.body.caption,
				destination: req.body.destination,
				sightseeingLocation: req.body.sightseeingLocation,
				rating: req.body.rating,
				likes: 0,
				image_id: result.public_id, // image id on cloudinary server
                image_url: result.url, // image url on cloudinary server
				comments: []
			})

            // Save image to the database
            post.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
})

// Route for getting all posts
//GET /post
app.get('/posts', (req, res) => {

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// get all posts
	Post.find().then((post) => {
		res.send(post)
	}).catch((error) => {
		console.log(error)
		res.status(500).send("Internal Server Error")
	})

})

/*
Route for adding comment to particular post
Requst body expects:
{
	username: <username of person who left comment>,
	content: <comment content>
}
*/
// POST /post/id
app.post('/posts/:id', (req, res) => {

	const id = req.params.id

	// check id is valid
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// new comment
	const comment = {
		username: req.body.username,
		content: req.body.content
	}
	const fieldsToUpdate = { comments: comment }



	Post.findOneAndUpdate({ _id: id }, { $push: fieldsToUpdate }, { new: true, useFindAndModify: false }).then((post) => {
		if (!post) {
			res.status(404).send('Resource not found')
		} else {
			res.send({ comment, post })
		}
	}).catch((error) => {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	})
})

// Route for increasing the number of likes by 1.
app.patch('/posts/:id', (req, res, next) => {

	const id = req.params.id

	// Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send();
		return; 
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	Post.findOneAndUpdate({_id: id}, {$set: {likes: req.body.likes}}, {new: true, useFindAndModify: false}).then((post) => {
		if (!post) {
			res.status(404).send('Resource not found');
			return;
		} else {
			post.save();
			res.send(post);
		}
	}).catch((error) => {
		log(error)
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
	

})

// Destination API Routes below 

/// Route for getting all destination information
// GET /destination
app.get('/destination', (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	Destination.find().then((destinations) => {
		res.send(destinations)
	})
		.catch((error) => {
			log(error)
			res.status(500).send("Internal Server Error")
		})
})

/// Route for getting information for one destination
// GET /destination/id
app.get('/destination/:id', (req, res) => {
	const id = req.params.id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	Destination.findById(id).then((destination) => {
		if (!destination) {
			res.status(404).send('Resource not found')
		} else {
			res.send(destination)
		}
	})
		.catch((error) => {
			log(error)
			res.status(500).send('Internal Server Error')
		})
})

/*
Route for adding a sightseeing location to a destination
Request body expects:
{
	"sightseeing": <name of sightseeing place>
}
POST /destination/id
*/
app.post('/destination/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	Destination.findOneAndUpdate({ _id: id }, { $push: { sightseeingLocations: req.body.sightseeing } }, { new: true, useFindAndModify: false }).then((destination) => {
		if (!destination) {
			res.status(404).send('Resource not found')
		} else {
			res.send(destination)
		}
	})
		.catch((error) => {
			log(error)
			if (isMongoError(error)) {
				res.status(500).send('Internal server error')
			} else {
				res.status(400).send('Bad Request')
			}
		})
})

/*** User routes below **********************************/

/*
POST Route for adding a new user
Request body expects:
{
	"username": "user",
	"password": "hashedpassword"
}
POST /users
*/
app.post('/users', async (req, res) => {

	// Create a new student using the Student mongoose model
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		profilePicture: req.body.profilePicture,
		description: req.body.description,
		verified: false,
		isAdmin: false,
	})


	// Save user to the database
	try {
		const result = await user.save()
		res.send({status: 0, currentUser: user})
	} catch (error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.send({status: 1, currentUser: undefined})
		}
	}
})

// Route for getting all users
//GET /users
app.get('/users', (req, res) => {

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// get all posts
	User.find().then((users) => {
		res.send(users)
	}).catch((error) => {
		console.log(error)
		res.status(500).send("Internal Server Error")
	})

})

app.get('/user/:username', (req, res) => {

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	const username = req.params.username;

	// get all posts
	User.find({username: username}).then((user) => {
		if (user.length) {
			res.send({status:0, user: user[0]});
		} else {
			res.send({status:1, user: undefined});
		}
	}).catch((error) => {
		// something went wrong
		console.log(error)
		res.send({status:2, user: undefined});
	})

})

// Route for changing user password
app.patch('/user/password/:id', (req, res) => {

	const userID = req.params.id;

	// Validate id immediately.
	if (!ObjectID.isValid(userID)) {
		res.status(404).send();
		return; 
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	const user = User.findById(userID);

	User.findByUsernamePassword(req.body.username, req.body.currentPassword)
        .then(user => {
			if (user === 'user') {
				// User not found
				res.send({status: 1, user: undefined});
			} else if (user === 'password') {
				// Password is incorrect
				res.send({status: 2, user: user});
			} else {

				// Current password is correct, update new password
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
						const newPassword = {'password': hash};

						User.findOneAndUpdate({ _id: userID }, newPassword, {new: true, useFindAndModify: false}).then((user) => {
							if (!user) {
								res.send({status: 1, message:"user not found", user: undefined});
								return;
							} else {		
								// Don't send back hashed password
								user.password = '';
		
								res.send({status: 0, message:"Update successfull", user: user});
							}
						}).catch((error) => {
							if (isMongoError(error)) {
								res.status(500).send('Internal server error')
							} else {
								console.log(error);
								res.send({status: 2, message:"Something went wrong", user: undefined});
							}
						});
						
					})
				})
			}
        })
        .catch(error => {
            res.send({status: 3, user: undefined});
        });
})

// Route for changing specific user's information
// PATCH /users/id
app.patch('/users/:id', (req, res) => {

	const userID = req.params.id;

	// Validate id immediately.
	if (!ObjectID.isValid(userID)) {
		res.status(404).send();
		return; 
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	const user = User.findById(userID)

	User.findOneAndUpdate({ _id: userID }, req.body, {new: true, useFindAndModify: false}).then((user) => {
		if (!user) {
			res.send({status: 1, message:"user not found", user: undefined});
			return;
		} else {
			user.save()
			res.send({status: 0, message:"Update successfull", user: user});
		}
	}).catch((error) => {
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
            console.log(error);
			res.send({status: 2, message:"Something went wrong", user: undefined});
		}
	});
})


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
	res.sendFile(__dirname + "/build/index.html");
});

// keep this at bottom 
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});