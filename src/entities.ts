import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

export class Address {
  @Column()
  address: string;

  @Column()
  number: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column({ nullable: true, type: "varchar" })
  additionalInfo: string | null;

  @Column()
  neighborhood: string;
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column(() => Address)
  address: Address;
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "decimal" })
  price: number;
}

export enum OrderStatus {
  pending = "pending",
  paid = "paid",
  canceled = "canceled",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @ManyToOne(() => Customer)
  customer: Customer;

  @Column({ type: "decimal" })
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Column()
  status: OrderStatus;

  addItems(items: OrderItem[]) {
    this.items = items;
    this.calculateTotal();
  }

  addItem(item: OrderItem) {
    this.items.push(item);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.items.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    );
  }
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @Column()
  productId: number;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;

  @Column({ type: "decimal" })
  unitPrice: number;
}