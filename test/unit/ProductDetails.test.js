/**
 * @jest-environment jsdom
 */
import { bundleProducts, init } from "../utils";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import * as React from "react";
import { addToCart } from "../../src/client/store";

const initProductDetails = () => {
  const product = bundleProducts(1)[0];
  const { container, store } = init(<ProductDetails product={product} />);
  return { store, product, container };
}

describe("Страница товара", () => {
  it("Если товар уже добавлен в корзину, на странице товара должно отображаться сообщение об этом", () => {
    const { store, product, container } = initProductDetails();
    store.dispatch(addToCart(product));
    expect(container.textContent).toContain("Item in cart");
  });

  it("На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка \"добавить в корзину\"", () => {
    const { product, container } = initProductDetails();

    const buttons = Array.from(container.querySelectorAll("button"));
    const addToCartButton = buttons.find((b) => b.textContent === "Add to Cart");

    expect(container.querySelector(".ProductDetails-Name").textContent).toBe(product.name);
    expect(container.querySelector(".ProductDetails-Description").textContent).toBe(product.description);
    expect(container.querySelector(".ProductDetails-Price").textContent).toBe(`$${product.price}`);
    expect(container.querySelector(".ProductDetails-Color").textContent).toBe(product.color);
    expect(container.querySelector(".ProductDetails-Material").textContent).toBe(product.material);
    expect(addToCartButton).toBeTruthy();
  });
})