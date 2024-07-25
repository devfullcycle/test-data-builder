import { Order, OrderStatus } from "../../entities";
import { CustomerFakeBuilder } from "../customer-fake.builder";
import { OrderFakeBuilder } from "../order-fake.builder";
import { OrderItemFakeBuilder } from "../order-item-fake.builder";

describe("OrderFakeBuilder tests", () => {
  test("withId should set id", () => {
    const id = 10;
    const order = OrderFakeBuilder.anOrder().withId(id).build();
    expect(order.id).toBe(id);
  });

  test("withCustomer should set customer", () => {
    const customer = CustomerFakeBuilder.aCustomer().build();
    const order = OrderFakeBuilder.anOrder().withCustomer(customer).build();
    expect(order.customer).toBe(customer);
  });

  test("withStatus should set status", () => {
    const status = OrderStatus.paid;
    const order = OrderFakeBuilder.anOrder().withStatus(status).build();
    expect(order.status).toBe(status);
  });

  test("addRandomItems should add items", () => {
    const countItems = 3;
    const order = OrderFakeBuilder.anOrder().addRandomItems(countItems).build();
    expect(order.items.length).toBe(countItems);
  });

  test("addItem should add item", () => {
    const order = OrderFakeBuilder.anOrder()
      .addItem(OrderItemFakeBuilder.anOrderItem().build())
      .build();
    expect(order.items.length).toBe(1);
  });

  test("build should create an instance of Order", () => {
    const order = OrderFakeBuilder.anOrder().build();
    expect(order).toBeInstanceOf(Order);
  });

  test("andPendingOrder should create an order with status pending", () => {
    const order = OrderFakeBuilder.andPendingOrder().build();
    expect(order.status).toBe(OrderStatus.pending);
  });

  test("andPaidOrder should create an order with status paid", () => {
    const order = OrderFakeBuilder.andPaidOrder().build();
    expect(order.status).toBe(OrderStatus.paid);
  });

  test("andCanceledOrder should create an order with status canceled", () => {
    const order = OrderFakeBuilder.andCanceledOrder().build();
    expect(order.status).toBe(OrderStatus.canceled);
  });

  test("theOrders should create multiple orders", () => {
    const countOrders = 3;
    const orders = OrderFakeBuilder.theOrders(countOrders).build();
    expect(orders.length).toBe(countOrders);
  });
});
