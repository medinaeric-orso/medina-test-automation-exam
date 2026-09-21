class HomePageObjects {
  constructor(page) {
    this.page = page;
    this.searchForm = page.locator('main').getByRole('search', { name: 'flight' });
    this.originInput = this.searchForm.getByRole('combobox', { name: 'Origin location' });
    this.destinationInput = this.searchForm.getByRole('combobox', { name: 'Destination location' });
    this.departureDateButton = this.searchForm.getByRole('button', { name: 'Departure date' });
    this.returnDateButton = this.searchForm.getByRole('button', { name: 'Return date' });
    this.searchButton = this.searchForm.getByRole('button', { name: 'Search' }).locator('visible=true');
  }

  selectedLocation(city) {
    return this.searchForm.getByText(new RegExp(city, 'i')).first();
  }

  suggestionOption(name) {
    return this.page.getByRole('option', { name: new RegExp(name, 'i') }).first();
  }

  calendarDay(dateLabel) {
    return this.page.getByRole('button', { name: new RegExp(`^${dateLabel}`) }).first();
  }
}

module.exports = { HomePageObjects };
