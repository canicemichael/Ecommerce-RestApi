## Ecommerce RestApi
This project is the backend service of an imaginary e-commerce app

## Setup
Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

## Install MongoDB
To run this project, you need to install the latest version of MongoDB Community Edition first.

[https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)

Once you install MongoDB, make sure it's running.

## Install the Dependencies
Next, from the project folder, install the dependencies:
```
npm i
```

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
