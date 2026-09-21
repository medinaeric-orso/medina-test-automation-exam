const { test } = require('@playwright/test');
const { HomeActions } = require('../actions/home_actions');
const { CommonPageObjects } = require('../page_objects/common_page_objects');
const { HomePageObjects } = require('../page_objects/home_page_objects');
const { assertVisible, assertHidden } = require('../../helpers/assertion_helpers');

test.describe('Cheapflights home page', () => {
  test('positive: logo and sign in are displayed', async ({ page }) => {
    const homeActions = new HomeActions(page);
    const commonPage = new CommonPageObjects(page);

    await homeActions.openHomePage();

    await assertVisible(commonPage.logo);
    await assertVisible(commonPage.signInButton);
  });

  test('negative: missing destination keeps the search form on the home page', async ({ page }) => {
    const homeActions = new HomeActions(page);
    const homePage = new HomePageObjects(page);

    await homeActions.openHomePage();
    await homeActions.searchWithoutDestination();

    await assertVisible(homePage.searchButton);
    await assertVisible(homePage.destinationInput);
    await assertHidden(page.getByRole('heading', { name: /no such logo/i }));
  });
});
