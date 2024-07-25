import { OrderItem } from "../../entities";
import { OrderFakeBuilder } from "../order-fake.builder";
import { OrderItemFakeBuilder } from "../order-item-fake.builder";
import { ProductFakeBuilder } from "../product-fake.builder";

describe("OrderItemFakeBuilder Tests", () => {
  test("withId should set id", () => {
    const id = 10;
    const orderItem = OrderItemFakeBuilder.anOrderItem().withId(id).build();
    expect(orderItem.id).toBe(id);
  });

  test("withProduct should set product", () => {
    const product = ProductFakeBuilder.aProduct().build();
    const orderItem = OrderItemFakeBuilder.anOrderItem()
      .withProduct(product)
      .build();
    expect(orderItem.product).toBe(product);
  });

  test("withQuantity should set quantity", () => {
    const quantity = 10;
    const orderItem = OrderItemFakeBuilder.anOrderItem()
      .withQuantity(quantity)
      .build();
    expect(orderItem.quantity).toBe(quantity);
  });

  test("withOrder should set order", () => {
    const order = OrderFakeBuilder.anOrder().build();
    const orderItem = OrderItemFakeBuilder.anOrderItem()
      .withOrder(order)
      .build();
    expect(orderItem.order).toBe(order);
  });

  test("build should create an instance of OrderItem", () => {
    const orderItem = OrderItemFakeBuilder.anOrderItem().build();
    expect(orderItem).toBeInstanceOf(OrderItem);
    expect(orderItem.unitPrice).toBe(orderItem.product.price);
  });
});
