import { DataSource, Repository } from "typeorm";
import { Address, Customer, Order, OrderItem, Product } from "../entities";
import {
  aCustomer,
  CustomerFakeBuilder,
  theCustomers,
} from "../test-data-builders/customer-fake.builder";
import {
  AddressFakeBuilder,
  anAddress,
} from "../test-data-builders/address-fake.builder";
import {
  aProduct,
  theProducts,
} from "../test-data-builders/product-fake.builder";
import { anOrder, theOrders } from "../test-data-builders/order-fake.builder";
import { anOrderItem } from "../test-data-builders/order-item-fake.builder";

describe("Convencional Tests", () => {
  let dataSource: DataSource;
  let customerRepo: Repository<Customer>;
  let productRepo: Repository<Product>;
  let orderRepo: Repository<Order>;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      entities: [Address, Customer, Product, Order, OrderItem],
      synchronize: true,
      logging: false,
    });

    await dataSource.initialize();
    customerRepo = dataSource.getRepository(Customer);
    productRepo = dataSource.getRepository(Product);
    orderRepo = dataSource.getRepository(Order);
  });

  afterEach(async () => {
    await dataSource?.destroy();
  });

  it("should create an customer", async () => {
    const address = anAddress().withAddress("rua x").withNumber(123).build();
    const customer = aCustomer().withAddress(address).build();
    console.log(customer);
    await customerRepo.save(customer);

    const foundCustomer = await customerRepo.findOne({
      where: { id: customer.id },
    });

    expect(foundCustomer).toMatchObject({
      name: customer.name,
      email: customer.email,
      address: {
        address: customer.address.address,
        number: customer.address.number,
        city: customer.address.city,
        state: customer.address.state,
        zipCode: customer.address.zipCode,
        additionalInfo: customer.address.additionalInfo,
        neighborhood: customer.address.neighborhood,
      },
    });
  });

  it("should create a product", async () => {
    const product = aProduct().withPrice(123.12).build();
    console.log(product);
    await productRepo.save(product);

    const foundProduct = await productRepo.findOne({
      where: { id: product.id },
    });

    expect(foundProduct).toMatchObject({
      name: product.name,
      price: product.price,
    });
  });

  it("should create an order", async () => {
    const customer = aCustomer().withName("customer xpto").build();
    await customerRepo.save(customer);

    const product = aProduct().withName("product xpto").build();
    await productRepo.save(product);

    const order = anOrder()
      .withCustomer(customer)
      .addItem(anOrderItem().withProduct(product).build())
      .build();

    const orderItem1 = order.items[0];

    await orderRepo.save(order);

    const orders = await orderRepo.findOne({
      where: { customerId: customer.id },
      relations: ["customer", "items", "items.product"],
    });

    expect(orders).toMatchObject({
      customer: {
        name: customer.name,
        email: customer.email,
        address: {
          address: customer.address.address,
          number: customer.address.number,
          city: customer.address.city,
          state: customer.address.state,
          zipCode: customer.address.zipCode,
          additionalInfo: customer.address.additionalInfo,
          neighborhood: customer.address.neighborhood,
        },
      },
      items: [
        {
          product: {
            name: product.name,
            price: product.price,
          },
          quantity: orderItem1.quantity,
          unitPrice: orderItem1.unitPrice,
        },
      ],
      total: order.total,
    });
  });

  it("variantes", async () => {
    const customer = aCustomer().withName("customer xpto").build();
    await customerRepo.save(customer);

    const product = aProduct().withName("product xpto").build();
    await productRepo.save(product);

    const itemBuilder = anOrderItem().withProduct(product);

    const order = anOrder()
      .withCustomer(customer)
      .addItem(itemBuilder.build())
      .addItem(itemBuilder.build())
      .addItem(itemBuilder.build())
      .build();

    //console.dir(order, { depth: null });

    const customerBuilder = aCustomer();

    console.log(customerBuilder.name);
    console.log(customerBuilder.name);
    console.log(customerBuilder.name);
    console.log(customerBuilder.name);
    console.log(customerBuilder.name);

    const customer1 = customerBuilder.copy().withName("xpto").build();
    const customer2 = customerBuilder.copy().build();

    console.log(customer1, customer2);
  });

  test("multiple objects", async () => {
    const customers = theCustomers(10)
      .withName((index) => `Customer ${index}`)
      .build();
    await customerRepo.save(customers);

    const products = theProducts(10)
      .withName((index) => `Product ${index}`)
      .withPrice((index) => index * 100)
      .build();
    await productRepo.save(products);

    const items = new Array(3).fill(undefined).map(
      (index: number) => () =>
        anOrderItem()
          .withProduct((index) => {
            return products[Math.floor(Math.random() * products.length)];
          })
          .build()
    );

    const orders = theOrders(100)
      .withCustomer((index: number) => customers[index % 10])
      .withItems(items)
      .build();
    
    await orderRepo.save(orders);
    
  });
});
