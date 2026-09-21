const { CommonActions } = require('./common_actions');
const bookingData = require('../data/booking_data');

class AuthActions extends CommonActions {
  async createToken(credentials = bookingData.auth) {
    return this.send('post', '/auth', { data: credentials });
  }
}

module.exports = { AuthActions };
