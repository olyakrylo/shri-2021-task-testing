const { assert } = require("chai");

describe("Каталог", function () {
  beforeEach(async ({ browser }) => {
    await browser.url("/");
  });

  async function openCatalog(browser) {
    await browser.url("/catalog");
    await browser.waitUntil(
      async () =>  (await browser.$$(".card-link")).length > 0,
      {
        timeout: 3000,
        timeoutMsg: "Загрузка каталога",
      }
    );
  }

  async function openFirstDetails(browser) {
    const detailsLink = await browser.$(".card-link");
    const url = await detailsLink.getAttribute("href");
    await browser.url(url);

    return url;
  }

  it("Если товар уже добавлен в корзину, повторное нажатие кнопки \"добавить в корзину\" должно увеличивать его количество", async function ({ browser }) {
    await openCatalog(browser);
    const url = await openFirstDetails(browser);

    const addToCart = await browser.$(".ProductDetails-AddToCart");
    await addToCart.click();

    await browser.url("/cart");
    const countBefore = await browser.$(".Cart-Count");
    const countBeforeText = await countBefore.getText();

    await browser.url(url);
    await addToCart.click();

    await browser.url("/cart");
    const countAfter = await browser.$(".Cart-Count");
    const countAfterText = await countAfter.getText();

    assert.equal(parseInt(countAfterText) - parseInt(countBeforeText), 1);
  });

  it("Содержимое корзины должно сохраняться между перезагрузками страницы", async function ({ browser }) {
    await openCatalog(browser);
    await openFirstDetails(browser);

    const addToCart = await browser.$(".ProductDetails-AddToCart");
    await addToCart.click();

    await browser.url("/cart");
    const beforeReloadTable = await browser.$(".Cart-Table");
    const beforeReloadTableText = await beforeReloadTable.getText();

    await browser.url("/cart");
    const afterReloadTable = await browser.$(".Cart-Table");
    const afterReloadTableText = await afterReloadTable.getText();

    assert.equal(beforeReloadTableText, afterReloadTableText)
  });
})