### JWT: JSON Web Tokens
Considered to be a form of user identification that is issued after the initial user auth takes place.
When a user completes their login process and they are authentiticated, our rest api will issue the client application an access token and a refresh token

The Access Token is given a short time before it expires, for example 5 to 15 minutes.
The Refresh Token is given a longer duration before it expires, possible several hours, a day or even days.

### ACCESS TOKEN
Our API will send and receive Access Tokens as JSON data.
It's recommended to only store access tokens in memory, so they automatically lost when the app is closed.
They should not be stored in local storage or in a cookie.
Keep access in memory which you might also refer to as the current application state.

The overall access token process involves issuing an access token during user authorization, the user's applciation can then access our rest api's protected routes with the access token until it expires.
Our api will verify the access token with middleware every time the access token is used to make a request.
When the access token does expire, the user's application will need to send their refresh to our api's refresh endpoint to get a new access token.

### REFRESH TOKEN
Our API will issue refresh tokens in an httpOnly cookie.
This type of cookie is not accessible with js.
Refresh Tokens do need to have an expiration which will then require users to log in again.
Refresh Tokens should not have the ability to issue new refresh tokens because that essentially grants indefinite access if a refresh token falls into the wrong hands.

The refresh token is also issued during user authorization.
Our rest api's refresh endpoint will verify the token and cross-reference the refresh token in our database too.
Storing a reference to a refresh token in database will allow refresh tokens to be terminated early if the user decides to log out.
Refresh tokens need to be allowed to expire, so indefinite access cannot be gained.


### AUTHENTICATION
Authentication refers to the proess of verifying who someone is


### AUTHORIZATION
Authorization is the process of verifying what specific resources a user has access to.
When we log-in with the username and password we are verifying who we are and that is considered to be authentication.

After logging in our express api issues users jwt tokens-.....
While it's true that the tokens confirm the authentication process has already taken place, these tokens also allow access to our api endpoints which provide our api data.
This is authorization a hint towards this fact is that a jwt token uses the authorization header.

Today we will expand the authorization process by adding user's roles with specific permissions to our api authorization process


### MONGODB
MongoDB is the 'm' in the MERN stack. It represents the database in the stack.
The frontend application of the MERN stack is handled by react.
Along with nodejs and express, mongodb completes the backend rest api.

Traditional sql databases are build it a relational structure.
Related tables reference each other with joins as data is queried.
These relational tables also normalize the data, that means data is not duplicated in the tables, that's the dry principle which stands for don't repeat yourself and that's apply to the structure.

However with no sql like mongodb, you can throw all of that out.
Mongodb stores in collections. The individual records in the collections are called documents.
The documents have a key value structure and look a lot like json.
A collection holds all of the data about a user for example, istead of breaking it into related tables.
Likewise duplicating and distributing the data where deemed necessary in a nosql structure is permitted.

So, why choose nosql databases and what are the advantages of using mongobb?

`Performance:` The speed at which a collection is queried is very fast.

`Flexibility:` It's very easy to make structural changes like adding a new field without wreaking havoc in your total structure. It's like adding a new property to an object.

<<<<<<< HEAD
`Scalability:` nosql can support large databases with high request rates at a very low latency
=======
`Scalability:` nosql can support large databases with high request rates at a very low latency.
>>>>>>> a7acea54f2f9c7689ed3fd4c50a303b46d1a9c3e

`Usability:` As you'll see today we can get up and running with mongodb in the cloud very fast.


mongodb+srv://daramayo90:<password>@cluster0.gwkve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

npm install mongoose

https://mongoosejs.com/docs/connections.html

`connected:` Emitted when Mongoose successfully makes its initial connection to the MongoDB server, or when Mongoose reconnects after losing connectivity. May be emitted multiple times if Mongoose loses connectivity.
`open:` Emitted after 'connected' and onOpen is executed on all of this connection's models.
