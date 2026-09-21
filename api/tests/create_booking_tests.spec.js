const { test } = require('@playwright/test');
const { BookingActions } = require('../actions/booking_actions');
const bookingData = require('../data/booking_data');
const { assertStatus, assertHasFields, assertFieldEquals } = require('../../helpers/assertion_helpers');

test.describe('CreateBooking API', () => {
  test('positive: creates a booking and returns booking fields', async ({ request }) => {
    const bookingActions = new BookingActions(request);
    const response = await bookingActions.createBooking();
    const body = await response.json();

    assertStatus(response, 200);
    assertHasFields(body, ['bookingid', 'booking']);
    assertHasFields(body.booking, bookingData.bookingFields);
    assertFieldEquals(body, 'booking.firstname', bookingData.validBooking.firstname);
    assertFieldEquals(body, 'booking.lastname', bookingData.validBooking.lastname);
    assertFieldEquals(body, 'booking.totalprice', bookingData.validBooking.totalprice);
    assertFieldEquals(body, 'booking.depositpaid', bookingData.validBooking.depositpaid);
    assertFieldEquals(body, 'booking.bookingdates.checkin', bookingData.validBooking.bookingdates.checkin);
    assertFieldEquals(body, 'booking.bookingdates.checkout', bookingData.validBooking.bookingdates.checkout);
    assertFieldEquals(body, 'booking.additionalneeds', bookingData.validBooking.additionalneeds);
  });

  test('negative: create booking with empty payload fails', async ({ request }) => {
    const bookingActions = new BookingActions(request);
    const response = await bookingActions.createBooking({});

    test.info().annotations.push({
      type: 'note',
      description: 'Restful Booker typically returns 500 for an invalid create payload',
    });
    assertStatus(response, 500);
  });
});
