import { Address, Customer } from "../entities";
import { AddressFakeBuilder } from "./address-fake.builder";
import { PropOrFactory } from "./types";
import { BaseFakeBuilder } from "./base-fake.builder";

export class CustomerFakeBuilder<TBuild = any> extends BaseFakeBuilder<TBuild> {
  private _id: PropOrFactory<number | null> = (_index) => null;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _email: PropOrFactory<string> = (_index) => this.chance.email();
  private _address: PropOrFactory<Address> = (_index) =>
    AddressFakeBuilder.anAddress().build();

  static aCustomer() {
    return new CustomerFakeBuilder<Customer>();
  }

  static theCustomers(countObjs: number) {
    return new CustomerFakeBuilder<Customer[]>(countObjs);
  }

  withId(valueOrFactory: PropOrFactory<number>) {
    this._id = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withEmail(valueOrFactory: PropOrFactory<string>) {
    this._email = valueOrFactory;
    return this;
  }

  withAddress(valueOrFactory: PropOrFactory<Address>) {
    this._address = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const customers = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const customer = new Customer();
        customer.id = this.callFactory(this._id, index);
        customer.name = this.callFactory(this._name, index);
        customer.email = this.callFactory(this._email, index);
        customer.address = this.callFactory(this._address, index);
        return customer;
      });
    return this.countObjs === 1 ? (customers[0] as any) : customers;
  }

  get id() {
    return this.getValue("id");
  }

  get name() {
    return this.getValue("name");
  }

  get email() {
    return this.getValue("email");
  }

  get address() {
    return this.getValue("address");
  }
}


export const aCustomer = CustomerFakeBuilder.aCustomer;

export const theCustomers = CustomerFakeBuilder.theCustomers;