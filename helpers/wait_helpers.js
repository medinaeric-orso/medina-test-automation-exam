async function waitForVisible(locator, timeout) {
  await locator.waitFor({ state: 'visible', timeout });
}

async function waitAndClick(locator, timeout) {
  await waitForVisible(locator, timeout);
  await locator.click();
}

async function waitAndFill(locator, value, timeout) {
  await waitForVisible(locator, timeout);
  await locator.fill(value);
}

async function waitAndPress(locator, key, timeout) {
  await waitForVisible(locator, timeout);
  await locator.press(key);
}

module.exports = {
  waitForVisible,
  waitAndClick,
  waitAndFill,
  waitAndPress,
};
