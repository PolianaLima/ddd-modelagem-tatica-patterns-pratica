
import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_items";
import OrderService from "./orderService";

describe('Order Service unit tests', () => {

    it("should place an order", () => {

        const customer = new Customer("c1", "Customer 01");
        const item1 = new OrderItem("i1", "Item 01", 10, "p1", 1);
        
        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });


    it('should get total of all orders', () => {

        const orderItem1 = new OrderItem("i1", "Item 01", 100, "p1", 1);
        const orderItem2 = new OrderItem("i2", "Item 02", 200, "p2", 2);

        const order1 = new Order("o1", "c1", [orderItem1]);
        const order2 = new Order("o2", "c1", [orderItem2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);

    });
});