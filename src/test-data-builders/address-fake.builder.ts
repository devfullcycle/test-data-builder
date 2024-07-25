import { PropOrFactory } from "./types";
import { Address } from "../entities";
import { BaseFakeBuilder } from "./base-fake.builder";

export class AddressFakeBuilder<TBuild = any> extends BaseFakeBuilder<TBuild> {
  private _address: PropOrFactory<string> = (_index) => this.chance.word();
  private _number: PropOrFactory<number> = (_index) =>
    this.chance.integer({ min: 1, max: 9999 });
  private _city: PropOrFactory<string> = (_index) => this.chance.city();
  private _state: PropOrFactory<string> = (_index) => this.chance.state();
  private _zipCode: PropOrFactory<string> = (_index) => this.chance.zip();
  private _additionalInfo: PropOrFactory<string | null> = (_index) =>
    this.chance.word();
  private _neighborhood: PropOrFactory<string> = (_index) => this.chance.word();

  static anAddress() {
    return new AddressFakeBuilder<Address>();
  }

  static theAddresses(countObjs: number) {
    return new AddressFakeBuilder<Address[]>(countObjs);
  }

  withAddress(valueOrFactory: PropOrFactory<string>) {
    this._address = valueOrFactory;
    return this;
  }

  withNumber(valueOrFactory: PropOrFactory<number>) {
    this._number = valueOrFactory;
    return this;
  }

  withCity(valueOrFactory: PropOrFactory<string>) {
    this._city = valueOrFactory;
    return this;
  }

  withState(valueOrFactory: PropOrFactory<string>) {
    this._state = valueOrFactory;
    return this;
  }

  withZipCode(valueOrFactory: PropOrFactory<string>) {
    this._zipCode = valueOrFactory;
    return this;
  }

  withAdditionalInfo(valueOrFactory: PropOrFactory<string>) {
    this._additionalInfo = valueOrFactory;
    return this;
  }

  withoutAdditionalInfo() {
    this._additionalInfo = null;
    return this;
  }

  withNeighborhood(valueOrFactory: PropOrFactory<string>) {
    this._neighborhood = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const addresses = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const address = new Address();
        address.address = this.callFactory(this._address, index);
        address.number = this.callFactory(this._number, index);
        address.city = this.callFactory(this._city, index);
        address.state = this.callFactory(this._state, index);
        address.zipCode = this.callFactory(this._zipCode, index);
        address.additionalInfo = this.callFactory(this._additionalInfo, index);
        address.neighborhood = this.callFactory(this._neighborhood, index);
        return address;
      });
    return this.countObjs === 1 ? (addresses[0] as any) : addresses;
  }

  get id() {
    return this.getValue("id");
  }

  get address() {
    return this.getValue("address");
  }

  get number() {
    return this.getValue("number");
  }

  get city() {
    return this.getValue("city");
  }

  get state() {
    return this.getValue("state");
  }

  get zipCode() {
    return this.getValue("zipCode");
  }

  get additionalInfo() {
    return this.getValue("additionalInfo");
  }

  get neighborhood() {
    return this.getValue("neighborhood");
  }
}

export const anAddress = AddressFakeBuilder.anAddress;

export const theAddresses = AddressFakeBuilder.theAddresses;
