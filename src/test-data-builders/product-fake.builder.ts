import { Product } from "../entities";
import { BaseFakeBuilder } from "./base-fake.builder";
import { PropOrFactory } from "./types";

export class ProductFakeBuilder<TBuild = any> extends BaseFakeBuilder<TBuild> {
  private _id: PropOrFactory<number | null> = (_index) => null;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _price: PropOrFactory<number> = (_index) =>
    this.chance.floating({ min: 1, max: 9999, fixed: 2 });

  static aProduct() {
    return new ProductFakeBuilder<Product>();
  }

  static aProductWithZeroPrice() {
    return new ProductFakeBuilder<Product>().withZeroPrice();
  }

  static theProducts(countObjs: number) {
    return new ProductFakeBuilder<Product[]>(countObjs);
  }

  withId(valueOrFactory: PropOrFactory<number>) {
    this._id = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withPrice(valueOrFactory: PropOrFactory<number>) {
    this._price = valueOrFactory;
    return this;
  }

  withZeroPrice() {
    this._price = 0;
    return this;
  }

  build(): TBuild {
    const products = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const product = new Product();
        product.id = this.callFactory(this._id, index);
        product.name = this.callFactory(this._name, index);
        product.price = this.callFactory(this._price, index);
        return product;
      });
    return this.countObjs === 1 ? (products[0] as any) : products;
  }

  get id() {
    return this.getValue("id");
  }

  get name() {
    return this.getValue("name");
  }

  get price() {
    return this.getValue("price");
  }
}

export const aProduct = ProductFakeBuilder.aProduct;

export const theProducts = ProductFakeBuilder.theProducts;