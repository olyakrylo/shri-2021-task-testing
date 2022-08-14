/**
 * @jest-environment jsdom
 */
import * as React from "react";
import { waitFor } from "@testing-library/react";
import { Catalog } from "../../src/client/pages/Catalog";
import { bundleProducts, init } from "../utils";

import * as axios from "axios";

jest.mock("axios");

describe("Каталог", () => {
  it("В каталоге должны отображаться товары, список которых приходит с сервера", async () => {
    const data = bundleProducts(2);
    axios.get.mockImplementation(() => Promise.resolve({ status: 200, data }));

    const { container } = init(<Catalog />);

    for (const item of data) {
      await waitFor(() => {
        expect(container.textContent).toContain(item.name);
      });
    }
  });
});