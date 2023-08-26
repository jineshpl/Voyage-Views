# team14: 

Group Members: Sebastian Botero, Jasmeen Sran, Isha Surani, Jinesh Patel

# Voyage Views
Voyage Views is a website that allows users to share their travel experiences. 
Users can go onto the home page of the website to view posts about specific travel
destinations. In order to post your own reviews, an account must be created. This can be 
done by clicking the 'sign up' button on the navigation bar. After setting up an 
account, users can post pictures from the approved destinations by clicking 'create post' on the navigation bar. They can add 
a caption, rating and select a sight seeing location that pertains to their post.
If they do not see their sight seeing location, they can submit their own which will be approved by admdin. Users
can also like posts and leave comments after creating an account. Account details
can be changed in the settings page, this page can be reached by clicking
'my account' on the navigation bar. In the settings page, the user can request to be
verified by clicking the verify me button. A user will be verified by the admin 
if they have posted enough reputable reviews. The timeline page is used to see other users posts.
By clicking on their username, a profile page can be seen which complies all that users 
posts along with a description of them. In order to view your own profile page, users can 
scroll down to the bottom of any page and click on the personal profile link. The link 
to log out of your account can also be found at the bottom of any page. More detail on the specific pages is provided below. 

## Heroku URL
https://csc309team14.herokuapp.com/

### Heroku Credentials
email: csc309team14@gmail.com
password: Mark309#

## Running Environment
Run the setup script to store MongoDB URI in environment variable and install dependencies with `. env_setup.sh` in terminal.

Once dependencies are installed, `npm start` will start the Express application, connect to MongoDB, and start the React Application concurrently.


## API Routes

## app.post('/posts', async (req, res))

This route is used to add a post to the database. The data the request body expects is below
Request body expects:
{
	"username": <username>
	"caption": <post caption>
	"destination": <post destination>
	"sightseeingLocation": <post sightseeing location>
	"rating": <post rating>
	"postId": <postId>
}
where postId and rating are numbers are the rest are strings.
This route is used to post a desitnation post to the database after a user has submitted all the info.

## app.post("/users/login", (req, res)
This route is used to login a user and create a session. The request body expects a username and password
{
	"username": <username>
	 "password": <password>
}
where both username and password are strings. This route is used when a user logs in.

## app.get("/users/logout", (req, res))
This route removes the session and logs out the current user. It is used when a user logs out

## app.get("/users/check-session", (req, res))
This route is used to check if a user is logged on the session.

## app.get('/posts', (req, res)
This route is used to retrive all of the posts in the database. It is used in the timeline and home page in order to display all posts

## app.post('/posts/:id', (req, res)
This route is used to post a comment onto a post object in the database. The request body expects a username and the content of the comments which are both strings

{
	"username": "user",
	"content": "Nice post!"
}
This route is used on the timeline page when users leave comments on posts.

## app.get('/destination', (req, res)
This route is used to retrive all of the destinations in our database. It is used in the create post page in order to display the destinations for the user.

## app.get('/destination/:id', (req, res)
This route is used to retrive a specific desintation from the database. It is used in the create post page in order to display the sight seeing locations for a specific destination to the user

## app.post('/destination/:id', (req, res)
This route is used to add a sightseeing location to a destination. The request body expects a sightseeing location which is a string 

{
	"sightseeing":"cn tower"
}
This route is used by admin to add sight seeing locations to a specific destination.

## app.post('/users', async (req, res)
This route is used to add a new user. The request body expects a username and hashed password
{
	"username":"user"
	"password":"43tbrt3utgbr"
}
This route is used when a user signs up for a new account

## app.get('/users', (req, res) )
This route is used to retrive all of the users.

## app.patch('/users/:id', (req, res)
This route is used to change information about a specific user. It is used when a user decided to change their account information in the settings page.

# Standard User Instructions

## Home Page
This view is the first page you will see when starting the site. There will be a navigation bar which has two buttons allowing you to login or sign up. These buttons take you to the corresponding pages for each view.

Then, you will see the review posts below the navigation bar. On the left, you will see options that could be selection. Under **Destinations** in the options, you could select any destination to view only posts from that destination. Next, under **Rating**, you could select any rating between 1 to 5 stars to view posts with that star rating. 

At the bottom of page, there will a footer which links to the login and sign up page.

## Login Page
This view is the page you will see when pressing the login button from the Home Page. The page contains two input fields to enter your login credentials. Using the login credentials for a user from **Login Credentials** section you will be able to login as a user. When pressing the submit button, if any field is empty, an alert will be shown saying "Username or password is empty.". If an username which doesn't exists is entered, an alert will be displayed sating "User does not exist. Sign Up." If an user exists but the wrong password is entered, an alert will be shown saying "Password is incorrect.". If both fields are correct, it will switch to the **Timeline** page. There is also a sign up page for an user to sign up.

## Sign Up Page
This view is the page you will see when pressing the signup button. There will be two input fields to enter a new username and password. If the username already exists, an alert will be display saying "Username already exists." and if any field is empty, an alert will be displayed. Pressing the confirm button will take you to the **Register** Page.

## Register Page
This view is the page you will see when pressing the confirm button on the sign up page. Here, you will be able to add an profile picture by pressing the image icon and see how the picture looks in the profile image space. Pressing the "Confirm Account" button will take the user to the TimeLine Page.

## Timeline Page
This is the main view for the user which allows to see all posts.

The navigation bar will consists of two buttons which are **Post** and **Destinations**. The Post button will take you to the **Create Post** page and the Destinations button will take you back to the Timeline page.

The profile picture in the upper right corner will take you to the **Settings** page.

The options on the left side contain three ways to filter posts. Selecting specific a destination to view posts for that destination. Selecting a rating between one to five stars. And, a "Random" button to view a random post.

The post itself contain a picture of the destination with regard to the location. The user who posted the review, destination and location, number of likes that the post has received, a rating of the destination, and a caption for the review. 

There are two options on a post when a user is logged in. One is the expand option which allows an user to see comments on the post. Another is the comment option which expands the post so the user could comment.

There is also a footer at the bottom of the page which allows the user to access different pages such as **Personal Profile**, **Create Post**, **Settings**, and **Log Out**.

## Create Post Page
This is the view for a user to create a post. This is accessible through the "Post" button on the **Timeline** Page. 

Here, you are able to add an image for the post, select a rating from 1 to 5, select a destination, select an optional attraction, and a caption for the post. If an attraction does not exists, the user could submit an attraction for the admin to verify.

You could post the review by clicking the "Post" button in the bottom right corner.

By clicking on the user on the post, you will see the profile page of the user.

## Profile Page
This view displays the profile of a user. 

First, a header will be display with the profile picture, display name of the user and their username, a caption to describe themselves, their location, and number of posts.

Next, a timeline of their posts would be dislayed with functionality of expanding, commenting, and liking the post.

## Settings Page

This is the view for a user to change their account details.

The user can change their profile picture. Enter personal information such as full name, email, and address. Then, the user could submit to save their details.

The user could change their password by entering their current password and adding a new password.

Also, the user could become a verified reviewer by pressing the "Verify Me" button that will allow the admin to verify the user based on their post history.

# Admin Instructions

The admin user is a standard user with admin level functionality. You could login with admin account using the username which is **admin** and password which is **admin**.

## Admin Page
This page is similar to the User Settings Page except with the additional functionally of being able to verify users. 
