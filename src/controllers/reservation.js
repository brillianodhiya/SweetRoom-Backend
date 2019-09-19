const reservation = require("../models/reservation");
// const user = require("../models/user");
// const hotel = require("../models/hotel");
const jwtDecode = require('jwt-decode')

module.exports = {
  insertReservation: (req, res) => {
    const token = req.headers['sweet_token']
    const decoded = jwtDecode(token)

    const hotel_id = req.params.hotel_id;
    const room_id = req.body.room_id
    
    const user_id = decoded.id;
    const plan_checkin = req.body.plan_checkin;
    const plan_checkout = req.body.plan_checkout;
    const invoice = "SR" + Date.now();
    const reservation_date = new Date();
    const num_people = req.body.num_people;

    reservation
      .actionDetailHotel(room_id)
      .then(result => {
        if (result.length === 0) {
          res.json({
            success: false,
            message: "hotel not found",
            data: room_id,
            error: "cant get data in database"
          });
        } else {
          Object.keys(result).forEach(key => {
            const hotel = result[key];

            const bed_type = hotel.bed_type;
            const room_number = hotel.room_number;
            const price = hotel.price;

            reservation
              .actionReservation([
                hotel_id,
                user_id,
                invoice,
                reservation_date,
                num_people,
                bed_type,
                room_number,
                price,
                plan_checkin,
                plan_checkout
              ])
              .then(row => {
                res.json({
                  success: true,
                  message: "Reservation Success",
                  data: row,
                  error: [""]
                });
              })
              .catch(err =>
                res.json({
                  success: false,
                  message: "Reservation Failed",
                  data: [""],
                  error: err
                })
              );
          });
        }
      })
      .catch(err =>
        res.json({
          success: false,
          message: "something wrong",
          data: id,
          error: err
        })
      );
  },
  actionCheckIn: (req, res) => {
    const id = req.params.id;
    const data = {
      check_in: new Date()
    };

    reservation
      .actionCheck(data, id)
      .then(row => {
        res.json({
          success: true,
          message: "Success Check In",
          data: row,
          error: [""]
        });
      })
      .catch(err =>
        res.json({
          success: false,
          message: "Something Wrong",
          data: row,
          error: err
        })
      );
  },
  actionCheckOut: (req, res) => {
    const id = req.params.id;
    const data = {
      check_out: new Date()
    };

    reservation
      .actionCheck(data, id)
      .then(row => {
        res.json({
          success: true,
          message: "Success Check Out",
          data: row,
          error: [""]
        });
      })
      .catch(err =>
        res.json({
          success: false,
          message: "Something Wrong",
          data: id,
          error: err
        })
      );
  },
  actionMakeSuccess: (req, res) => {
    const id = req.params.id;
    const data = {
      status: 'success'
    };

    reservation
      .actionCheck(data, id)
      .then(row => {
        res.json({
          success: true,
          message: "Success",
          data: row,
          error: [""]
        });
      })
      .catch(err =>
        res.json({
          success: false,
          message: "Something Wrong",
          data: id,
          error: err
        })
      );
  },
  actionMakeCancel: (req, res) => {
    const id = req.params.id;
    const data = {
      status: 'cancel'
    };

    reservation
      .actionCheck(data, id)
      .then(row => {
        res.json({
          success: true,
          message: "Success Cancel",
          data: row,
          error: [""]
        });
      })
      .catch(err =>
        res.json({
          success: false,
          message: "Something Wrong",
          data: id,
          error: err
        })
      );
  },
  actionFindReservation: (req, res) => {
    const id = req.params.id;

    reservation
      .actionFindReservation(id)
      .then(row => {
        res.json({
          success: true,
          message: "Success Finding",
          data: row,
          error: [""]
        });
      })
      .catch(err =>
        res.json({
          success: false,
          message: "Something Wrong",
          data: id,
          error: err
        })
      );
  },
  actionFindReservByPlace: (req, res) => {
    const hotel_id = req.params.hotel_id;

    reservation
      .actionFindReservByPlace(hotel_id)
      .then(row => {
        res.json({
          success: true,
          message: "Success Finding",
          data: row,
          error: [""]
        });
      })
      .catch(err =>
        res.json({
          success: false,
          message: "Something Wrong",
          data: hotel_id,
          error: err
        })
      );
  },
  actionFindReservByUser: (req, res) => {
    const user_id = req.params.user_id;

    reservation
      .actionFindReservByPlace(user_id)
      .then(row => {
        res.json({
          success: true,
          message: "Success Finding",
          data: row,
          error: [""]
        });
      })
      .catch(err =>
        res.json({
          success: false,
          message: "Something Wrong",
          data: user_id,
          error: err
        })
      );
  },
  actionDeleteReservation: (req, res) => {
    const id = req.params.id;

    reservation
      .actionDeleteReservation(id)
      .then(row => {
        res.json({
          success: true,
          message: "Success Delete",
          data: row,
          error: [""]
        });
      })
      .catch(err => {
        res.json({
          success: false,
          message: "Something Wrong",
          data: id,
          error: err
        });
      });
  },
  History: (req, res) => {

    // const id = req.params.id;
    const token = req.headers['sweet_token']
    const decoded = jwtDecode(token)

    const user_id = decoded.id

    reservation
      .actionHistory(user_id)
      .then(row => {
        // console.log(user_id)
        res.json({
          success: true,
          message: "Success Get",
          data: row,
          error: [""]
        });
      })
      .catch(err => {
        res.json({
          success: false,
          message: "Something Wrong",
          data: id,
          error: err
        });
      });
  },
};
