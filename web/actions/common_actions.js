const { CommonPageObjects } = require('../page_objects/common_page_objects');
const { waitAndClick } = require('../../helpers/wait_helpers');
const commonData = require('../data/common_data');

class CommonActions {
  constructor(page) {
    this.page = page;
    this.commonPage = new CommonPageObjects(page);
  }

  async openHomePage() {
    await this.page.goto(commonData.homePath);
    await this.dismissOverlays();
  }

  async dismissOverlays() {
    const cookieAccept = this.commonPage.cookieAcceptButton;
    if (await cookieAccept.first().isVisible().catch(() => false)) {
      await waitAndClick(cookieAccept.first());
    }

    const closeAlert = this.page.getByRole('button', { name: /^close$/i });
    if (await closeAlert.first().isVisible().catch(() => false)) {
      await waitAndClick(closeAlert.first());
    }
  }
}

module.exports = { CommonActions };
