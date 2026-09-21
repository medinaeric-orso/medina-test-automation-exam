const { CommonActions } = require('./common_actions');
const bookingData = require('../data/booking_data');

class BookingActions extends CommonActions {
  tokenHeaders(token) {
    return { Cookie: `token=${token}` };
  }

  async createBooking(payload = bookingData.validBooking) {
    return this.send('post', '/booking', { data: payload });
  }

  async getBooking(bookingId) {
    return this.send('get', `/booking/${bookingId}`);
  }

  async updateBooking(bookingId, payload = bookingData.updatedBooking, token) {
    const options = { data: payload };
    if (token) {
      options.headers = this.tokenHeaders(token);
    }
    return this.send('put', `/booking/${bookingId}`, options);
  }

  async deleteBooking(bookingId, token) {
    const options = {};
    if (token) {
      options.headers = this.tokenHeaders(token);
    }
    return this.send('delete', `/booking/${bookingId}`, options);
  }
}

module.exports = { BookingActions };
