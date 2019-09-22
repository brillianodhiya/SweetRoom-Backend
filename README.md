<h1 align="center">Sweet Room RESTfull API</h1>

Sweet Room RESTfull API is application specially for backend only. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. apache)
5. Nodemon

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. If you Dont have nodemon. You can install with type `npm install -g nodemon`
3. And install depedencies with type `yarn`
4. Make new file a called **.env**, set up first [here](#set-up-env-file)
5. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
6. Create a database with the name sweet_room, and Import file [sweet_room.sql](sweet_room.sql) to **phpmyadmin**
7. Start app's with type `yarn start`
8. Open Postman desktop application or Chrome web app extension that has installed before
9. Choose HTTP Method and enter request url.(ex. localhost:3006/hotel)
10. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
HOST=localhost
USER=root // default
PASS= // default
DATABASE=sweet_room

SECRET_KEY = 'your secretkey'

PORT = 1010

REDISCLOUD_URL = 'Your redis url'

BASIC_TOKEN = 'Your Basic Token Xendit'
```

## End Point
**1. GET**
* `/hotel` (Get all data of hotel)
* `/hotel/data/4` (Get 4 data of new hotel)
* `/hotel/search/:keyword` (Get data with search by city and hotel name)
* `/hotel/:id` (Get hotel by specific id)
* `/hotel/mitra/:id` (Get hotel by specific mitra)
* `/room` (Get all data of room)
* `/room/:id` (Get room by specific id)
* `/reservation/:id` (Get data reservation by id)
* `/reservation/place/:hotel_id` (Find place data reservation by hotel id)
* `/reservation/user/:user_id` (Find data reservation by user id)
* `/reservation/history/a` (Find data history reservation)
* `/reservation/history/hotel/:id` (Find data hotel reservation by id)
* `/reservation/latest/a` (Find new data reservation)
* `/user/profile` (get data profile)
* `/user/allemail/a` (get all data email)
* `/facility/` (get all data facility)
* `/facility/:id` (get data facility by id)
* `/favorite/` (get all data favorite)
* `/favorite/:id` (get data favorite by id)
* `/feedback/` (get all data feedback)
* `/feedback/:id` (get data feedback by id)


**2. POST**
* `/hotel` (Add new hotel)
* `/room` (Add new room)
* `/reservation/makeStatusSuccess/:id` (For check reservation hotel)
* `/reservation/makeStatusCancel` (For make reservation hotel status)
* `/reservation/insert/:hotel_id` (For reservation hotel)
* `/user/login` (Login users or mitra)
* `/user/register` (Add new users)
* `/user/mitra` (Add new mitra)
* `/facility/` (Add data facility)
* `/favorite/` (Add data favorite)
* `/feedback/` (Add data feedback)


**3. PATCH**
* `/hotel/:id` (Update hotel by id)
* `/room/:id` (Update room by id)
* `/reservation/checkin/:id` (Update reservation checkin by id)
* `/reservation/checkout/:id` (Update reservation checkout by id)
* `/user/:id` (update data profile users or mitra)
* `/facility/:id` (update data facility by id)
* `/favorite/:id` (update data favorite by id)
* `/feedback/:id` (update data feedback by id)

**4. DELETE**
* `/hotel/:id` (Delete hotel by id)
* `/room/:id` (Delete room by id)
* `/reservation/delete/:id` (Delete reservation by id)
* `/user/:id` (delete data users or mitra by id)
* `/facility/:id` (delete data facility by id)
* `/favorite/:id` (delete data favorite by id)
* `/feedback/:id` (delete data feedback by id)
