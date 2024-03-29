import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../db/sequileze/model/customer.model';
import ProductModel from '../db/sequileze/model/product.model';
import OrderModel from '../db/sequileze/model/order.model';
import OrderItemModel from '../db/sequileze/model/orderItem.model';
import Customer from '../../domain/entity/customer';
import Address from '../../domain/entity/address';
import ProductRepository from './product.repository';
import Product from '../../domain/entity/product';
import OrderItem from '../../domain/entity/order_items';
import Order from '../../domain/entity/order';
import OrderRepository from './order.repository';
import CustomerRepository from './customer.repository';
describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });

    await sequelize.addModels([
        CustomerModel,
        OrderModel,
        OrderItemModel,
        ProductModel,
    ]);
    await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const orderItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem, orderItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id:orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",

                },
                {
                    id:orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: "123",
                    product_id: "123",

                },
            ],

            });

    });
    
    
    it("should update a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer1.changeAddress(address);
        await customerRepository.create(customer1);

        const customer2 = new Customer("124", "Customer 1");
        customer2.changeAddress(address);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product1 = new Product("123", "Product 1", 10);
        await productRepository.create(product1);

        const product2 = new Product("124", "Product 2", 20);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem(
            "1",
            product1.name,
            product1.price,
            product1.id,
            2
        );

        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            2
        );


        const order = new Order("123", "123", [orderItem1]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        order.changeCostumerId("124");

        order.changeItems([orderItem2]);

        await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"],
    });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "124",
            total: order.total(),
            items: [
                {
                    id: "1",
                    name: product1.name,
                    price: product1.price,
                    quantity: 2,
                    order_id: "123",
                    product_id: "123",
                },
                {
                    id: "2",
                    name: product2.name,
                    price: product2.price,
                    quantity: 2,
                    order_id: "123",
                    product_id: "124",
                },
            ],
        });
    });
    


    it("should find a order by id", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        const orderFound = await orderRepository.findById("123");

        expect(orderModel.toJSON()).toStrictEqual({
            id: orderFound.id,
            customer_id: orderFound.costumerId,
            total: orderFound.total(),
            items: [
                {
                    id:orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                }
            ],
        });

        

    })

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const orderItem2 = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            2
        );

        const order1 = new Order("123", "123", [orderItem]);
        const order2 = new Order("124", "123", [orderItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const ordersFound = await orderRepository.findAll();

        expect(ordersFound).toHaveLength(2);
        expect(ordersFound[0]).toStrictEqual(order1);
        expect(ordersFound[1]).toStrictEqual(order2);
    })

});
