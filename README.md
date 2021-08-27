## An ExpressJS based Restful API.

### Using the API

You need to add/use these headers to make requests to the API:

Content-Type:application/json
When signed in, you need to provide the access token in the header:

access_token: <Access_token>

### Tech Stack

- NodeJS
- ExpressJS
- MongoDB
- Mongoose

### Features:

- Validation of user data (Joi)
- Users can login and register(JWT,Bcrypt)
- Data persistence using MongoDB
- Guests can read one or many posts
- Registered users can create new posts
