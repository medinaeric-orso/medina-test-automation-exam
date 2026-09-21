# Technical Exam for Medina, Eric

Sample Playwright project to automate web (Cheapflights) and API (Restful Booker)

- API tests can be found in: `api/`
- Web tests can be found in: `web/`

## Run

```bash
npm test
npm run test:web
npm run test:api
```

## Tests that I created

### Web

- **positive: logo and sign in are displayed** — checks the homepage logo and Sign in button are visible
- **negative: missing destination keeps the search form on the home page** — search without a destination stays on home
- **positive: searching flights shows results for the destination** — searches Manila to Sydney and checks results
- **negative: search without a destination does not open results** — search without a destination does not open the results URL

### API

- **positive: creates a booking and returns booking fields** — CreateBooking returns `bookingid` and booking fields
- **negative: create booking with empty payload fails** — empty payload is rejected
- **positive: returns booking fields for an existing id** — GetBooking returns the created booking fields
- **negative: unknown booking id returns 404** — GetBooking with a bad id returns 404
- **positive: updates a booking and returns updated fields** — UpdateBooking with a token returns the new fields
- **negative: update without a token returns 403** — UpdateBooking without auth is forbidden
- **positive: deletes a booking and it can no longer be retrieved** — DeleteBooking returns 201, then Get returns 404
- **negative: delete without a token returns 403** — DeleteBooking without auth is forbidden
