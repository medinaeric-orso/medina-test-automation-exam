const { HomePageObjects } = require('../page_objects/home_page_objects');
const { CommonActions } = require('./common_actions');
const { waitAndClick, waitAndFill, waitForVisible } = require('../../helpers/wait_helpers');
const homeData = require('../data/home_data');

class HomeActions extends CommonActions {
  constructor(page) {
    super(page);
    this.homePage = new HomePageObjects(page);
  }

  async selectLocation(input, city) {
    if (await this.homePage.selectedLocation(city).isVisible().catch(() => false)) {
      return;
    }

    await waitAndClick(input);
    await waitAndFill(input, city);
    await waitAndClick(this.homePage.suggestionOption(city));
  }

  async selectDate(dateButton, dateLabel) {
    await waitAndClick(dateButton);
    const day = this.homePage.calendarDay(dateLabel);
    await waitAndClick(day);
  }

  async searchFlights(origin = homeData.origin, destination = homeData.destination) {
    await waitForVisible(this.homePage.searchButton);
    await this.selectLocation(this.homePage.originInput, origin);
    await this.selectLocation(this.homePage.destinationInput, destination);
    await this.selectDate(this.homePage.departureDateButton, homeData.departureLabel);
    await this.selectDate(this.homePage.returnDateButton, homeData.returnLabel);
    await waitAndClick(this.homePage.searchButton);
  }

  async searchWithoutDestination() {
    await waitAndClick(this.homePage.searchButton);
  }
}

module.exports = { HomeActions };
