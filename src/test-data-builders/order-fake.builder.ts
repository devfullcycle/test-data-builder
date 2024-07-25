import { Customer, Order, OrderItem, OrderStatus } from "../entities";
import { BaseFakeBuilder } from "./base-fake.builder";
import { CustomerFakeBuilder } from "./customer-fake.builder";
import { OrderItemFakeBuilder } from "./order-item-fake.builder";
import { PropOrFactory } from "./types";

export class OrderFakeBuilder<TBuild = any> extends BaseFakeBuilder<TBuild> {
  private _id: PropOrFactory<number | null> = (_index) => null;
  private _customer: PropOrFactory<Customer> = (_index) =>
    CustomerFakeBuilder.aCustomer().build();
  private _status: PropOrFactory<OrderStatus> = (_index) => OrderStatus.pending;
  private _items: PropOrFactory<OrderItem>[] = [];

  static anOrder() {
    return new OrderFakeBuilder();
  }

  static andPendingOrder() {
    return OrderFakeBuilder.anOrder().withStatus(OrderStatus.pending);
  }

  static andPaidOrder() {
    return OrderFakeBuilder.anOrder().withStatus(OrderStatus.paid);
  }

  static andCanceledOrder() {
    return OrderFakeBuilder.anOrder().withStatus(OrderStatus.canceled);
  }

  static theOrders(countObjs: number, status = OrderStatus.pending) {
    return new OrderFakeBuilder(countObjs).withStatus(status);
  }

  withId(valueOrFactory: PropOrFactory<number>) {
    this._id = valueOrFactory;
    return this;
  }

  withCustomer(valueOrFactory: PropOrFactory<Customer>) {
    this._customer = valueOrFactory;
    return this;
  }

  withStatus(valueOrFactory: PropOrFactory<OrderStatus>) {
    this._status = valueOrFactory;
    return this;
  }

  addRandomItems(countItems: number) {
    for (let i = 0; i < countItems; i++) {
      this.addItem(OrderItemFakeBuilder.anOrderItem().build());
    }
    return this;
  }

  addItem(valueOrFactory: PropOrFactory<OrderItem>) {
    this._items.push(valueOrFactory);
    return this;
  }

  withItems(valueOrFactory: PropOrFactory<OrderItem>[]) {
    this._items = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const orders = new Array(this.countObjs).fill(undefined).map((_, index) => {
      const order = new Order();
      order.id = this.callFactory(this._id, index);
      order.customer = this.callFactory(this._customer, index);
      order.status = this.callFactory(this._status, index);
      order.addItems(this.callFactory(this.items, index));
      return order;
    });
    return this.countObjs === 1 ? (orders[0] as any) : orders;
  }

  get id() {
    return this.getValue("id");
  }

  get customer() {
    return this.getValue("customer");
  }

  get status() {
    return this.getValue("status");
  }

  get items() {
    const items = this.getValue("items");

    return items.length ? items : [OrderItemFakeBuilder.anOrderItem().build()];
  }
}

export const anOrder = OrderFakeBuilder.anOrder;
export const andPendingOrder = OrderFakeBuilder.andPendingOrder;
export const andPaidOrder = OrderFakeBuilder.andPaidOrder;
export const andCanceledOrder = OrderFakeBuilder.andCanceledOrder;

export const theOrders = OrderFakeBuilder.theOrders;