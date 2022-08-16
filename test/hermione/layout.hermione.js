const widthBySize = {
  l: 1200,
  m: 760,
  s: 450,
}

describe("Адаптивная верстка", async function () {
  async function clearCart(browser) {
    await browser.url("/cart");
    const clear = await browser.$(".Cart-Clear");
    if (!clear.error) {
      await clear.click();
    }
  }

  async function fillCart(browser) {
    await clearCart(browser);

    await browser.url("/catalog");
    await waitCatalog(browser);

    const detailsLink = await browser.$(".card-link");
    const url = await detailsLink.getAttribute("href");
    await browser.url(url);

    const addToCart = await browser.$(".ProductDetails-AddToCart");
    await addToCart.click();
  }

  async function waitCatalog(browser) {
    await browser.waitUntil(
      async () =>  (await browser.$$(".card-link")).length > 0,
      {
        timeout: 3000,
        timeoutMsg: "Загрузка каталога",
      }
    );
  }

  async function checkMainPage(size, browser) {
    await browser.setWindowSize(widthBySize[size], 800);
    await browser.assertView(`layout_${size}_base`, ".Application", {
      ignoreElements: [".nav-link"],
      compositeImage: false,
      allowViewportOverflow: true,
      selectorToScroll: ".Application",
      screenshotDelay: 800,
    });
  }

  async function checkDeliveryPage(size, browser) {
    await browser.setWindowSize(widthBySize[size], 800);
    await browser.assertView(`layout_${size}_delivery`, ".Application", {
      ignoreElements: [".nav-link"],
      compositeImage: false,
      allowViewportOverflow: true,
      selectorToScroll: ".Application",
      screenshotDelay: 800,
    });
  }

  async function checkContactsPage(size, browser) {
    await browser.setWindowSize(widthBySize[size], 800);
    await browser.assertView(`layout_${size}_contacts`, ".Application", {
      ignoreElements: [".nav-link"],
      compositeImage: false,
      allowViewportOverflow: true,
      selectorToScroll: ".Application",
      screenshotDelay: 300,
    });
  }

  async function checkCatalogPage(size, browser) {
    await browser.setWindowSize(widthBySize[size], 800);
    await browser.assertView(`layout_${size}_catalog`, ".Application", {
      ignoreElements: [".nav-link", ".CartBadge", ".ProductItem-Name", ".ProductItem-Price", ".ProductItem-DetailsLink"],
      compositeImage: false,
      allowViewportOverflow: true,
      selectorToScroll: ".Application",
      screenshotDelay: 300
    });
  }

  async function checkCartPage(size, browser) {
    await browser.setWindowSize(widthBySize[size], 800);
    await browser.assertView(`layout_${size}_cart`, ".Application", {
      ignoreElements: [".nav-link", ".Cart-Name", ".Cart-Price", ".Cart-Count", ".Cart-Total", ".Cart-OrderPrice"],
      compositeImage: false,
      allowViewportOverflow: true,
      selectorToScroll: ".Application",
      screenshotDelay: 800
    });
  }

  it("Главная страница", async function({ browser }) {
    await browser.url("/");

    await checkMainPage("l", browser);
    await checkMainPage("s", browser);
  });

  it("Доставка", async function({ browser }) {
    await browser.url("/delivery");

    await checkDeliveryPage("l", browser);
    await checkDeliveryPage("s", browser);
  });

  it("Контакты", async function({ browser }) {
    await browser.url("/contacts");

    await checkContactsPage("l", browser);
    await checkContactsPage("s", browser);
  });

  it("Каталог", async function({ browser }) {
    await browser.url("/catalog");
    await waitCatalog(browser);

    await checkCatalogPage("l", browser);
    await checkCatalogPage("s", browser);
  });

  it("Корзина", async function({ browser }) {
    await fillCart(browser);

    await browser.url("/cart");

    await checkCartPage("l", browser);
    await checkCartPage("s", browser);
  });
});