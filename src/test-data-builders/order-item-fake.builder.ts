import { Order, OrderItem, Product } from "../entities";
import { BaseFakeBuilder } from "./base-fake.builder";
import { ProductFakeBuilder } from "./product-fake.builder";
import { PropOrFactory } from "./types";

export class OrderItemFakeBuilder<
  TBuild = any
> extends BaseFakeBuilder<TBuild> {
  private _id: PropOrFactory<number | null> = (_index) => null;
  private _product: PropOrFactory<Product> = (_index) =>
    ProductFakeBuilder.aProduct().build();
  private _quantity: PropOrFactory<number> = (_index) =>
    this.chance.integer({ min: 1, max: 10 });
  private _order: PropOrFactory<Order | null> = (_index) => null;

  static anOrderItem() {
    return new OrderItemFakeBuilder();
  }

  static theOrderItems(countObjs: number) {
    return new OrderItemFakeBuilder(countObjs);
  }

  withId(valueOrFactory: PropOrFactory<number>) {
    this._id = valueOrFactory;
    return this;
  }

  withProduct(valueOrFactory: PropOrFactory<Product>) {
    this._product = valueOrFactory;
    return this;
  }

  withQuantity(valueOrFactory: PropOrFactory<number>) {
    this._quantity = valueOrFactory;
    return this;
  }

  withOrder(valueOrFactory: PropOrFactory<Order>) {
    this._order = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const orderItems = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const orderItem = new OrderItem();
        orderItem.id = this.callFactory(this._id, index);
        orderItem.product = this.callFactory(this._product, index);
        orderItem.quantity = this.callFactory(this._quantity, index);
        orderItem.unitPrice = orderItem.product.price;
        const order = this.callFactory(this._order, index);
        if (order) {
          orderItem.order = order;
        }
        return orderItem;
      });
    return this.countObjs === 1 ? (orderItems[0] as any) : orderItems;
  }

  get id() {
    return this.getValue("id");
  }

  get product() {
    return this.getValue("product");
  }

  get quantity() {
    return this.getValue("quantity");
  }
}

export const anOrderItem = OrderItemFakeBuilder.anOrderItem;

export const theOrderItems = OrderItemFakeBuilder.theOrderItems;