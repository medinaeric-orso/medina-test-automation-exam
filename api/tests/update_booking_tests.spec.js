const { test } = require('@playwright/test');
const { BookingActions } = require('../actions/booking_actions');
const { AuthActions } = require('../actions/auth_actions');
const bookingData = require('../data/booking_data');
const { assertStatus, assertHasFields, assertFieldEquals } = require('../../helpers/assertion_helpers');

test.describe('UpdateBooking API', () => {
  test('positive: updates a booking and returns updated fields', async ({ request }) => {
    const bookingActions = new BookingActions(request);
    const authActions = new AuthActions(request);

    const authResponse = await authActions.createToken();
    const { token } = await authResponse.json();

    const createResponse = await bookingActions.createBooking();
    const created = await createResponse.json();

    const response = await bookingActions.updateBooking(created.bookingid, bookingData.updatedBooking, token);
    const body = await response.json();

    assertStatus(response, 200);
    assertHasFields(body, bookingData.bookingFields);
    assertFieldEquals(body, 'firstname', bookingData.updatedBooking.firstname);
    assertFieldEquals(body, 'lastname', bookingData.updatedBooking.lastname);
    assertFieldEquals(body, 'totalprice', bookingData.updatedBooking.totalprice);
    assertFieldEquals(body, 'depositpaid', bookingData.updatedBooking.depositpaid);
    assertFieldEquals(body, 'bookingdates.checkin', bookingData.updatedBooking.bookingdates.checkin);
    assertFieldEquals(body, 'bookingdates.checkout', bookingData.updatedBooking.bookingdates.checkout);
    assertFieldEquals(body, 'additionalneeds', bookingData.updatedBooking.additionalneeds);
  });

  test('negative: update without a token returns 403', async ({ request }) => {
    const bookingActions = new BookingActions(request);
    const createResponse = await bookingActions.createBooking();
    const created = await createResponse.json();

    const response = await bookingActions.updateBooking(created.bookingid, bookingData.updatedBooking);
    assertStatus(response, 403);
  });
});
