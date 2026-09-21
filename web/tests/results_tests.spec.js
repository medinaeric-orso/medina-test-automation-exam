const { test, expect } = require('@playwright/test');
const { HomeActions } = require('../actions/home_actions');
const { ResultsActions } = require('../actions/results_actions');
const { ResultsPageObjects } = require('../page_objects/results_page_objects');
const { HomePageObjects } = require('../page_objects/home_page_objects');
const homeData = require('../data/home_data');
const { assertVisible, assertTextContains } = require('../../helpers/assertion_helpers');

test.describe('Cheapflights flight search', () => {
  test('positive: searching flights shows results for the destination', async ({ page }) => {
    test.setTimeout(90_000);
    const homeActions = new HomeActions(page);
    const resultsActions = new ResultsActions(page);
    const resultsPage = new ResultsPageObjects(page);

    await homeActions.openHomePage();
    await homeActions.searchFlights(homeData.origin, homeData.destination);
    await resultsActions.waitForResults();
    await resultsActions.waitForResultItems();

    await assertVisible(resultsPage.resultItems.first());
    await assertVisible(resultsPage.destinationText(homeData.destination));
    await assertTextContains(resultsPage.destinationText(homeData.destination), homeData.destination);
  });

  test('negative: search without a destination does not open results', async ({ page }) => {
    const homeActions = new HomeActions(page);
    const homePage = new HomePageObjects(page);

    await homeActions.openHomePage();
    await homeActions.searchWithoutDestination();

    await expect(page).not.toHaveURL(/\/(flights|flight-search)\//);
    await assertVisible(homePage.searchButton);
  });
});
