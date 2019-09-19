const client = require('../config/redis')
const helper = require('../middleware/helpers')

module.exports = {
    // ====== Favorite =====
    cacheGetAllFavorite: (req, res, next) => {
        client.get('getFavorite', (err, data) => {
            if (err) throw err;

            if (data !== null) {
                console.log('redis')
                helper.response(res, JSON.parse(data), 200);
            } else {
                next();
            }
        })
    },
    clearGetAllFavorite: (req, res, next) => {
        client.del('getFavorite')
        next();
    },
    // ====== hotel =====
    cacheGetAllHotel: (req, res, next) => {
        client.get('getHotel', (err, data) => {
            if (err) throw err;

            if (data !== null) {
                console.log('redis')
                helper.response(res, JSON.parse(data), 200);
            } else {
                next();
            }
        })
    },
    clearGetAllHotel: (req, res, next) => {
        client.del('getHotel')
        next();
    },
    // ====== Room =====
    cacheGetAllRoom: (req, res, next) => {
        client.get('getRoom', (err, data) => {
            if (err) throw err;

            if (data !== null) {
                console.log('redis')
                helper.response(res, JSON.parse(data), 200);
            } else {
                next();
            }
        })
    },
    clearGetAllRoom: (req, res, next) => {
        client.del('getRoom')
        next();
    },
    // ====== Feedback =====
    cacheGetAllFeedback: (req, res, next) => {
        client.get('getFeedback', (err, data) => {
            if (err) throw err;

            if (data !== null) {
                console.log('redis')
                helper.response(res, JSON.parse(data), 200);
            } else {
                next();
            }
        })
    },
    clearGetAllFeedback: (req, res, next) => {
        client.del('getFeedback')
        next();
    },
    // ====== Facility =====
    cacheGetAllFacility: (req, res, next) => {
        client.get('getFacility', (err, data) => {
            if (err) throw err;

            if (data !== null) {
                console.log('redis')
                helper.response(res, JSON.parse(data), 200);
            } else {
                next();
            }
        })
    },
    clearGetAllFacility: (req, res, next) => {
        client.del('getFacility')
        next();
    }
}