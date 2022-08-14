const { assert } = require("chai");

describe("Шапка магазина", async function () {
  beforeEach(async ({ browser }) => {
    await browser.newWindow("/");
    await browser.url("/");
  })

  it("В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", async function ({ browser }) {
    const navLinks = await browser.$$(".nav-link");
    const topics = await Promise.all(navLinks.map(link => link.getText()))
    const urls = await Promise.all(navLinks.map(link => link.getAttribute('href')))

    assert.deepEqual(topics, [ 'Catalog', 'Delivery', 'Contacts', 'Cart' ])
    assert.deepEqual(urls, ['/catalog', '/delivery', '/contacts', '/cart'])
  })

  it("Название магазина в шапке должно быть ссылкой на главную страницу", async function ({ browser }) {
    const store = await browser.$(".navbar-brand");
    const href = await store.getAttribute('href');

    assert.equal(href, "/");
  });

  it('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function ({ browser }) {
    await browser.setWindowSize(500, 800);

    const hamburger = await browser.$('.navbar-toggler');
    assert.isTrue(await hamburger.isDisplayed());

    const navMenu = await browser.$('.navbar-collapse');
    await hamburger.click();
    assert.isTrue(await navMenu.isDisplayed());
    await hamburger.click();
    assert.isFalse(await navMenu.isDisplayed());
  });

  it('При выборе элемента из меню "гамбургера", меню должно закрываться', async function ({ browser }) {
    await browser.setWindowSize(500, 800);

    const hamburger = await browser.$('.navbar-toggler');
    const navMenu = await browser.$('.navbar-collapse');

    await hamburger.click();
    await (await navMenu.$('.nav-link')).click();
    assert.isFalse(await navMenu.isDisplayed())
  });
});