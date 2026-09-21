const { expect } = require('@playwright/test');

async function assertVisible(locator) {
  await expect(locator).toBeVisible();
}

async function assertHidden(locator) {
  await expect(locator).toBeHidden();
}

async function assertTextContains(locator, text) {
  await expect(locator).toContainText(text);
}

function assertStatus(response, status) {
  expect(response.status()).toBe(status);
}

function getByPath(body, path) {
  return path.split('.').reduce((current, key) => current?.[key], body);
}

function assertHasFields(body, fields) {
  for (const field of fields) {
    expect(getByPath(body, field), `Expected field "${field}" to be present`).toBeDefined();
  }
}

function assertFieldEquals(body, path, value) {
  expect(getByPath(body, path)).toEqual(value);
}

module.exports = {
  assertVisible,
  assertHidden,
  assertTextContains,
  assertStatus,
  assertHasFields,
  assertFieldEquals,
};
