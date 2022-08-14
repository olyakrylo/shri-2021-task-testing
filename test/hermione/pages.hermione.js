const { assert } = require("chai");

describe("Страницы", async function () {
  beforeEach(async ({ browser }) => {
    await browser.newWindow("/");
    await browser.url("/");
  });

  it("В магазине должны быть страницы: главная, каталог, условия доставки, контакты", async function ({ browser }) {
    const home = await browser.$('.Home');
    assert.isTrue(await home.isDisplayed());

    await browser.url("/catalog");
    const catalog = await browser.$('.Catalog');
    assert.isTrue(await catalog.isDisplayed());

    await browser.url("/delivery");
    const delivery = await browser.$('.Delivery');
    assert.isTrue(await delivery.isDisplayed());

    await browser.url("/contacts");
    const contacts = await browser.$('.Contacts');
    assert.isTrue(await contacts.isDisplayed());
  });

  it("Страницы главная, условия доставки, контакты должны иметь статическое содержимое", async function ({ browser }) {
    await browser.setWindowSize(1200, 800);

    await browser.url("/");
    await browser.assertView("main-page", ".Application");

    await browser.url("/delivery");
    await browser.assertView("delivery-page", ".Application");

    await browser.url("/contacts");
    await browser.assertView("contacts-page", ".Application");
  })
});