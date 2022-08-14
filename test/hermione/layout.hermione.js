describe("Адаптивная верстка", async function () {
  beforeEach(async ({ browser }) => {
    await browser.newWindow("/");
  })

  async function waitCatalog(browser) {
    await browser.waitUntil(
      async () =>  (await browser.$$(".card-link")).length > 0,
      {
        timeout: 3000,
        timeoutMsg: "Загрузка каталога",
      }
    );
  }

  async function checkLayout(size, browser) {
    await browser.url("/");
    await browser.assertView(`layout_${size}_base`, ".Application");

    await browser.url("/delivery");
    await browser.assertView(`layout_${size}_delivery`, ".Application", {
      compositeImage: false,
      allowViewportOverflow: true,
    });

    await browser.url("/contacts");
    await browser.assertView(`layout_${size}_contacts`, ".Application");

    await browser.url("/cart");
    await browser.assertView(`layout_${size}_cart`, ".Application");

    await browser.url("/catalog");
    await waitCatalog(browser);
    await browser.assertView(`layout_${size}_catalog`, ".Application", {
      ignoreElements: [".ProductItem-Name", ".ProductItem-Price", ".ProductItem-DetailsLink"],
      compositeImage: false,
      allowViewportOverflow: true,
    });
  }

  it("Верстка должна адаптироваться под ширину экрана", async function ({ browser }) {
    await browser.setWindowSize(1200, 800);
    await checkLayout("l", browser);

    await browser.setWindowSize(760, 800);
    await checkLayout("m", browser);

    await browser.setWindowSize(450, 800);
    await checkLayout("s", browser);
  });
});