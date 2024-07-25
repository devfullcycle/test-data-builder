import { Chance } from "chance";
import { PropOrFactory } from "./types";

export abstract class BaseFakeBuilder<TBuild = any> {
  protected countObjs;
  protected chance: Chance.Chance;

  protected constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  static fromCopy<T extends BaseFakeBuilder>(builder: T): T {
    return builder.copy();
  }

  copy(): this {
    const copy = Object.create(this);
    Object.assign(copy, this);
    return copy;
  }

  abstract build(): TBuild;

  protected getValue(prop: any) {
    const privateProp = `_${prop}` as keyof this;
    return this.callFactory(this[privateProp], 0);
  }

  protected callFactory(
    factoryOrValue: PropOrFactory<any>,
    index: number
  ): any {
    if (typeof factoryOrValue === "function") {
      return factoryOrValue(index);
    }

    if (factoryOrValue instanceof Array) {
      return factoryOrValue.map((value) => this.callFactory(value, index));
    }

    return factoryOrValue;
  }
}
