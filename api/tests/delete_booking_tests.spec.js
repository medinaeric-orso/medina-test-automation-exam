const { test } = require('@playwright/test');
const { BookingActions } = require('../actions/booking_actions');
const { AuthActions } = require('../actions/auth_actions');
const { assertStatus } = require('../../helpers/assertion_helpers');

test.describe('DeleteBooking API', () => {
  test('positive: deletes a booking and it can no longer be retrieved', async ({ request }) => {
    const bookingActions = new BookingActions(request);
    const authActions = new AuthActions(request);
    const authResponse = await authActions.createToken();
    const { token } = await authResponse.json();

    const createResponse = await bookingActions.createBooking();
    const created = await createResponse.json();

    const deleteResponse = await bookingActions.deleteBooking(created.bookingid, token);
    assertStatus(deleteResponse, 201);

    const getResponse = await bookingActions.getBooking(created.bookingid);
    assertStatus(getResponse, 404);
  });

  test('negative: delete without a token returns 403', async ({ request }) => {
    const bookingActions = new BookingActions(request);
    const createResponse = await bookingActions.createBooking();
    const created = await createResponse.json();

    const deleteResponse = await bookingActions.deleteBooking(created.bookingid);
    assertStatus(deleteResponse, 403);
  });
});
