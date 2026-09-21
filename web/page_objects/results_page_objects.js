class ResultsPageObjects {
  constructor(page) {
    this.page = page;
    this.resultItems = page.getByRole('button', { name: /View Deal|Select/i });
    this.flightCount = page.getByText(/\d+ of \d+ flights/i);
  }

  destinationText(destination) {
    return this.page.getByText(new RegExp(destination, 'i')).first();
  }
}

module.exports = { ResultsPageObjects };
