/**
 * @jest-environment jsdom
 */
import { Application } from "../../src/client/Application";
import React from "react";
import { init } from "../utils";

describe("Шапка магазина", () => {
  it("В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", () => {
    const { container } = init(<Application />);

    const links = Array.from(container.querySelectorAll(".nav-link"));

    const callback = (href) => (link) => link.getAttribute("href") === href;

    const catalogLink = links.find(callback("/catalog"));
    const deliveryLink = links.find(callback("/delivery"));
    const contactsLink = links.find(callback("/contacts"));
    const cartLink = links.find(callback("/cart"));

    expect(catalogLink).toBeTruthy();
    expect(deliveryLink).toBeTruthy();
    expect(contactsLink).toBeTruthy();
    expect(cartLink).toBeTruthy();
  });

  it("Название магазина в шапке должно быть ссылкой на главную страницу", () => {
    const { container } = init(<Application />);

    const links = Array.from(container.querySelectorAll("a"));
    const brandLink = links.find((link) => link.textContent === "Example store");

    expect(brandLink?.getAttribute("href")).toBe("/");
  });
})