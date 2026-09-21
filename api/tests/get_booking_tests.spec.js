const { test } = require('@playwright/test');
const { BookingActions } = require('../actions/booking_actions');
const bookingData = require('../data/booking_data');
const { assertStatus, assertHasFields, assertFieldEquals } = require('../../helpers/assertion_helpers');

test.describe('GetBooking API', () => {
  test('positive: returns booking fields for an existing id', async ({ request }) => {
    const bookingActions = new BookingActions(request);
    const createResponse = await bookingActions.createBooking();
    const created = await createResponse.json();

    const response = await bookingActions.getBooking(created.bookingid);
    const body = await response.json();

    assertStatus(response, 200);
    assertHasFields(body, bookingData.bookingFields);
    assertFieldEquals(body, 'firstname', bookingData.validBooking.firstname);
    assertFieldEquals(body, 'lastname', bookingData.validBooking.lastname);
    assertFieldEquals(body, 'totalprice', bookingData.validBooking.totalprice);
    assertFieldEquals(body, 'depositpaid', bookingData.validBooking.depositpaid);
    assertFieldEquals(body, 'bookingdates.checkin', bookingData.validBooking.bookingdates.checkin);
    assertFieldEquals(body, 'bookingdates.checkout', bookingData.validBooking.bookingdates.checkout);
    assertFieldEquals(body, 'additionalneeds', bookingData.validBooking.additionalneeds);
  });

  test('negative: unknown booking id returns 404', async ({ request }) => {
    const bookingActions = new BookingActions(request);
    const response = await bookingActions.getBooking(bookingData.unknownBookingId);
    assertStatus(response, 404);
  });
});
