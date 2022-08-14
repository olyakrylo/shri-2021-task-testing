/**
 * @jest-environment jsdom
 */
import { bundleProducts, init } from "../utils";
import { ProductItem } from "../../src/client/components/ProductItem";
import * as React from "react";
import { addToCart } from "../../src/client/store";

const bundleShortProducts = (count) => {
  return bundleProducts(count).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
  }))
}

describe("Карточка товара", () => {
  it("Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре", () => {
    const shortProduct = bundleShortProducts(1)[0];
    const { container } = init(<ProductItem product={shortProduct} />);

    const links = Array.from(container.querySelectorAll("a"));
    const infoLink = links.find((l) => l.getAttribute("href") === `/catalog/${shortProduct.id}`);

    expect(container.querySelector(".ProductItem-Name").textContent).toBe(shortProduct.name);
    expect(container.querySelector(".ProductItem-Price").textContent).toBe(`$${shortProduct.price}`);
    expect(infoLink).toBeTruthy();
  });

  it("Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом", () => {
    const product = bundleProducts(1)[0];
    const shortProduct = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    const { container, store } = init(<ProductItem product={shortProduct} />);
    store.dispatch(addToCart(product));

    expect(container.textContent).toContain("Item in cart");
  });
})