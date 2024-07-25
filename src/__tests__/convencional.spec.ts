import { DataSource, Repository } from "typeorm";
import {
  Address,
  Customer,
  Order,
  OrderItem,
  OrderStatus,
  Product,
} from "../entities";

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
    const customer = new Customer();
    customer.name = "John Doe";
    customer.email = "customer@customer.com";
    customer.address = new Address();
    customer.address.address = "123 Main St";
    customer.address.number = 100;
    customer.address.city = "Springfield";
    customer.address.state = "IL";
    customer.address.zipCode = "62701";
    customer.address.additionalInfo = "Apt 1";
    customer.address.neighborhood = "Downtown";

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
    const product = new Product();
    product.name = "Product 1";
    product.price = 100;

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
    const address = new Address();
    address.address = "123 Main St";
    address.number = 100;
    address.city = "Springfield";
    address.state = "IL";
    address.zipCode = "62701";
    address.additionalInfo = "Apt 1";
    address.neighborhood = "Downtown";

    const customer = new Customer();
    customer.name = "John Doe";
    customer.email = "customer@customer.com";
    customer.address = address;
    await customerRepo.save(customer);

    const product = new Product();
    product.name = "Product 1";
    product.price = 100;
    await productRepo.save(product);

    const order = new Order();
    order.customer = customer;
    order.status = OrderStatus.pending;

    const orderItem1 = new OrderItem();
    orderItem1.product = product;
    orderItem1.quantity = 1;
    orderItem1.unitPrice = product.price;

    order.addItems([orderItem1]);

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
});
