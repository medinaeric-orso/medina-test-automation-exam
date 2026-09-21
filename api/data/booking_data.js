const validBooking = {
  firstname: 'Eric',
  lastname: 'Medina',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-10-01',
    checkout: '2026-10-05',
  },
  additionalneeds: 'Breakfast',
};

const updatedBooking = {
  firstname: 'Jordan',
  lastname: 'Lee',
  totalprice: 200,
  depositpaid: false,
  bookingdates: {
    checkin: '2026-11-01',
    checkout: '2026-11-08',
  },
  additionalneeds: 'Late checkout',
};

const bookingFields = [
  'firstname',
  'lastname',
  'totalprice',
  'depositpaid',
  'bookingdates.checkin',
  'bookingdates.checkout',
  'additionalneeds',
];

module.exports = {
  auth: {
    username: 'admin',
    password: 'password123',
  },
  invalidAuth: {
    username: 'admin',
    password: 'wrong-password',
  },
  validBooking,
  updatedBooking,
  bookingFields,
  unknownBookingId: 99999999,
};
