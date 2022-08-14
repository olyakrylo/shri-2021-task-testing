/**
 * @jest-environment jsdom
 */
import { bundleProducts, init } from "../utils";
import { screen } from "@testing-library/react";
import * as React from "react";
import { Cart} from "../../src/client/pages/Cart";
import { addToCart } from "../../src/client/store";
import { Application } from "../../src/client/Application";

describe("Корзина", () => {
  it("В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", () => {
    const { container, store } = init(<Application />);
    const [product1, product2] = bundleProducts(2);
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product2));

    const links = Array.from(container.querySelectorAll(".nav-link"));
    const cartLink = links.find((l) => l.getAttribute("href") === "/cart");

    expect(cartLink?.textContent).toContain("2");
  });

  it("В корзине должна отображаться таблица с добавленными в нее товарами", () => {
    const { container, store } = init(<Cart />);
    const products = bundleProducts(2);
    store.dispatch(addToCart(products[0]));
    store.dispatch(addToCart(products[1]));

    const table = container.querySelector(".Cart-Table");
    expect(table).toBeTruthy();
    expect(table.textContent).toContain(products[0].name);
    expect(table.textContent).toContain(products[1].name);
  });

  it("Для каждого товара должны отображаться название, цена, количество, стоимость, а также должна отображаться общая сумма заказа", async () => {
    const { container, store } = init(<Cart />);

    const [product1, product2] = bundleProducts(2);
    store.dispatch(addToCart(product1));

    const productRow = screen.getByTestId(product1.id.toString());
    expect(productRow.querySelector(".Cart-Name").textContent).toBe(product1.name);
    expect(productRow.querySelector(".Cart-Price").textContent).toBe(
      `$${product1.price}`
    );
    expect(productRow.querySelector(".Cart-Count").textContent).toBe("1");
    expect(productRow.querySelector(".Cart-Total").textContent).toBe(
      `$${product1.price}`
    );
    expect(container.querySelector(".Cart-OrderPrice").textContent).toBe(
      `$${product1.price}`
    );

    store.dispatch(addToCart(product1));
    expect(productRow.querySelector(".Cart-Count").textContent).toBe("2");
    expect(productRow.querySelector(".Cart-Total").textContent).toBe(
      `$${product1.price * 2}`
    );
    expect(container.querySelector(".Cart-OrderPrice").textContent).toBe(
      `$${product1.price * 2}`
    );

    store.dispatch(addToCart(product2));
    expect(container.querySelector(".Cart-OrderPrice").textContent).toBe(
      `$${product1.price * 2 + product2.price}`
    );
  });

  it("Если корзина пустая, должна отображаться ссылка на каталог товаров", () => {
    const { container } = init(<Cart />);

    const links = Array.from(container.querySelectorAll("a"));
    const catalogLink = links.find(l => l.getAttribute("href") === "/catalog");
    expect(catalogLink).toBeTruthy();
  });

  it("В корзине должна быть кнопка \"очистить корзину\", по нажатию на которую все товары должны удаляться", () => {
    const { container, store } = init(<Cart />);

    const product = bundleProducts(1)[0];

    store.dispatch(addToCart(product));
    (container.querySelector(".Cart-Clear")).click();
    expect(Object.keys(store.getState().cart).length).toBe(0);
  })
})