import { Product } from "../../entities";
import { ProductFakeBuilder } from "../product-fake.builder";

describe("ProductFakeBuilder Tests", () => {
  const chance = require("chance").Chance();
  test("withId should set id", () => {
    const id = 10;
    const product = ProductFakeBuilder.aProduct().withId(id).build();
    expect(product.id).toBe(id);
  });

  test("withName should set name", () => {
    const name = "Product 1";
    const product = ProductFakeBuilder.aProduct().withName(name).build();
    expect(product.name).toBe(name);
  });

  test("withPrice should set price", () => {
    const price = 100.0;
    const product = ProductFakeBuilder.aProduct().withPrice(price).build();
    expect(product.price).toBe(price);
  });

  test("build should create an instance of Product", () => {
    const product = ProductFakeBuilder.aProduct().build();
    expect(product).toBeInstanceOf(Product);
  });

  test("theProducts should create an array of Product", () => {
    const products = ProductFakeBuilder.theProducts(3).build();
    expect(products).toHaveLength(3);
    expect(products[0]).toBeInstanceOf(Product);
  });

  test("withId should set id for each product", () => {
    const products = ProductFakeBuilder.theProducts(3).withId(10).build();
    expect(products[0].id).toBe(10);
    expect(products[1].id).toBe(10);
    expect(products[2].id).toBe(10);
  });

  test("withName should set name for each product", () => {
    const products = ProductFakeBuilder.theProducts(3)
      .withName("Product 1")
      .build();
    expect(products[0].name).toBe("Product 1");
    expect(products[1].name).toBe("Product 1");
    expect(products[2].name).toBe("Product 1");
  });

  test("withPrice should set price for each product", () => {
    const products = ProductFakeBuilder.theProducts(3).withPrice(100.0).build();
    expect(products[0].price).toBe(100.0);
    expect(products[1].price).toBe(100.0);
    expect(products[2].price).toBe(100.0);
  });

  test("withId should set id for each product with different values", () => {
    const products = ProductFakeBuilder.theProducts(3)
      .withId((index) => index)
      .build();
    expect(products[0].id).toBe(0);
    expect(products[1].id).toBe(1);
    expect(products[2].id).toBe(2);
  });

  test("withName should set name for each product with different values", () => {
    const products = ProductFakeBuilder.theProducts(3)
      .withName((index) => `Product ${index}`)
      .build();
    expect(products[0].name).toBe("Product 0");
    expect(products[1].name).toBe("Product 1");
    expect(products[2].name).toBe("Product 2");
  });

  test("withPrice should set price for each product with different values", () => {
    const products = ProductFakeBuilder.theProducts(3)
      .withPrice((index) => index * 100.0)
      .build();
    expect(products[0].price).toBe(0.0);
    expect(products[1].price).toBe(100.0);
    expect(products[2].price).toBe(200.0);
  });

  test("build should create an array of Product", () => {
    const products = ProductFakeBuilder.theProducts(3).build();
    expect(products).toHaveLength(3);
    expect(products[0]).toBeInstanceOf(Product);
    expect(products[1]).toBeInstanceOf(Product);
    expect(products[2]).toBeInstanceOf(Product);
  });

  test("build should create an array of Product with different values", () => {
    const products = ProductFakeBuilder.theProducts(3)
      .withId((index) => index)
      .withName((index) => `Product ${index}`)
      .withPrice((index) => index * 100.0)
      .build();
    expect(products[0].id).toBe(0);
    expect(products[0].name).toBe("Product 0");
    expect(products[0].price).toBe(0.0);
    expect(products[1].id).toBe(1);
    expect(products[1].name).toBe("Product 1");
    expect(products[1].price).toBe(100.0);
    expect(products[2].id).toBe(2);
    expect(products[2].name).toBe("Product 2");
    expect(products[2].price).toBe(200.0);
  });

  test("build should create an array of Product with different values using chance", () => {
    const products = ProductFakeBuilder.theProducts(3)
      .withId(() => chance.integer({ min: 1, max: 100 }))
      .withName(() => chance.word())
      .withPrice(() => chance.floating({ min: 1, max: 9999, fixed: 2 }))
      .build();
    expect(products).toHaveLength(3);
    expect(products[0].id).toBeGreaterThanOrEqual(1);
    expect(products[0].id).toBeLessThanOrEqual(100);
    expect(products[0].name).not.toBe("");
    expect(products[0].price).toBeGreaterThanOrEqual(1);
    expect(products[0].price).toBeLessThanOrEqual(9999);
  });

  test("build should create an array of Product with different values using chance and index", () => {
    const products = ProductFakeBuilder.theProducts(3)
      .withId((index) => chance.integer({ min: index, max: index + 100 }))
      .withName((index) => `${chance.word()} ${index}`)
      .withPrice((index) =>
        chance.floating({ min: index, max: index + 9999, fixed: 2 })
      )
      .build();
    expect(products).toHaveLength(3);
    expect(products[0].id).toBeGreaterThanOrEqual(0);
    expect(products[0].id).toBeLessThanOrEqual(100);
    expect(products[0].name).not.toBe("");
    expect(products[0].price).toBeGreaterThanOrEqual(0);
    expect(products[0].price).toBeLessThanOrEqual(9999);
  });
});
