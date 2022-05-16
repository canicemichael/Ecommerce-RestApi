## Ecommerce RestApi
This project is the backend service of an imaginary e-commerce app

## Run it locally
1. To run this project, you need to install the latest version of MongoDB Community Edition first.[https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
2. Create a cloudinary account to get an API key and secret code
```
git clone https://github.com/canicemichael/Ecommerce-RestApi.git
cd Ecommerce-RestApi
```

Once you install MongoDB, make sure it's running.

## Install the Dependencies
Next, from the project folder, install the dependencies:
```
npm i
```

## Built With
- Node.js - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
- express - Fast, unopinionated, minimalist web framework for Node.js
- MongoDB - The database for modern applications
- Mongoose - Elegant MongoDB object modeling for Node.js

## Start the Server
```
npm run start
```
This will launch the Node server on port 5000. If that port is busy, you can set a different point in config/default.json.

Open up your browser and head over to:

http://localhost:5000

## (Optional) Environment Variables
If you look at config/default.json, you'll see a property called jwtPrivateKey. This key is used to encrypt JSON web tokens. So, for security reasons, it should not be checked into the source control. I've set a default value here to make it easier for you to get up and running with this project. For a production scenario, you should store this key as an environment variable.

Check out [the postman documentation](https://documenter.getpostman.com/view/16601080/Uyxbqpqx).
