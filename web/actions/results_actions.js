const { expect } = require('@playwright/test');
const { ResultsPageObjects } = require('../page_objects/results_page_objects');
const { CommonActions } = require('./common_actions');
const { waitForVisible } = require('../../helpers/wait_helpers');
const resultsData = require('../data/results_data');

class ResultsActions extends CommonActions {
  constructor(page) {
    super(page);
    this.resultsPage = new ResultsPageObjects(page);
  }

  async waitForResults() {
    await expect(this.page).toHaveURL(resultsData.resultsUrlPattern, { timeout: 45_000 });
    await this.dismissOverlays();
  }

  async waitForResultItems() {
    await waitForVisible(this.resultsPage.flightCount, 45_000);
    await waitForVisible(this.resultsPage.resultItems.first(), 45_000);
  }
}

module.exports = { ResultsActions };
