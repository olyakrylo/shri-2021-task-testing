import { CartApi, ExampleApi } from "../src/client/api";
import { initStore } from "../src/client/store";
import { CartState, Product } from "../src/common/types";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as React from "react";

class TestCartApi extends CartApi {
  state = {};

  constructor(initialData: CartState) {
    super();
    this.state = initialData;
  }

  getState(): CartState {
    return this.state as CartState;
  }

  setState(cart: CartState) {
    this.state = cart;
  }
}

export const getStore = (initialData: CartState) => {
  const basename = "/";
  const api = new ExampleApi(basename);
  const cart = new TestCartApi(initialData);
  return initStore(api, cart);
};

export const bundleProducts = (count: number): Product[] => {
  return Array(count).fill(0).map((_, i) => ({
    id: i,
    name: `name-${i}`,
    description: `description-${i}`,
    color: `color-${i}`,
    material: `material-${i}`,
    price: i + 1,
  }))
}

export const init = (children) => {
  const store = getStore({});

  const { container } = render(
    <BrowserRouter>
      <Provider store={store}>
        {children}
      </Provider>
    </BrowserRouter>
  );

  return { container, store };
}