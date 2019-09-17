const reservation = require("../models/reservation");
// const user = require("../models/user");
// const hotel = require("../models/hotel");

module.exports = {
  insertReservation: (req, res) => {
    const hotel_id = req.params.hotel_id;
    const user_id = req.params.user_id;
    const plan_checkin = req.body.plan_checkin;
    const plan_checkout = req.body.plan_checkout;
    const invoice = "SR" + Date.now();
    const reservation_date = req.body.reservation_date;
    const num_people = req.body.num_people;

    reservation
      .actionDetailHotel(hotel_id)
      .then(result => {
        if (result.length === 0) {
          res.json({
            success: false,
            message: "hotel not found",
            data: user_id,
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
  }
};
