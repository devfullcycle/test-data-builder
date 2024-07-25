import { Customer } from "../../entities";
import { AddressFakeBuilder } from "../address-fake.builder";
import { CustomerFakeBuilder } from "../customer-fake.builder";

describe("CustomerFakeBuilder Tests", () => {
  test("withId should set id", () => {
    const id = 10;
    const customer = CustomerFakeBuilder.aCustomer().withId(id).build();
    expect(customer.id).toBe(id);
  });

  test("withName should set name", () => {
    const name = "John Doe";
    const customer = CustomerFakeBuilder.aCustomer().withName(name).build();
    expect(customer.name).toBe(name);
  });

  test("withEmail should set email", () => {
    const email = "customer@customer.com";
    const customer = CustomerFakeBuilder.aCustomer().withEmail(email).build();
    expect(customer.email).toBe(email);
  });

  test("withAddress should set address", () => {
    const address = AddressFakeBuilder.anAddress().build();
    const customer = CustomerFakeBuilder.aCustomer()
      .withAddress(address)
      .build();
    expect(customer.address).toBe(address);
  });

  test("build should create an instance of Customer", () => {
    const customer = CustomerFakeBuilder.aCustomer().build();
    expect(customer).toBeInstanceOf(Customer);
  });
});
