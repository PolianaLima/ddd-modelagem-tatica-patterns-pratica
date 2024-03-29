
import { v4 as uuid } from "uuid";
import Customer from "../entity/customer";
import OrderItem from "../entity/order_items";
import Order from "../entity/order";

export default class OrderService {

    static placeOrder(customer:Customer, items:OrderItem[]): Order{
        if(items.length === 0){
            throw new Error('Order must have at least one item');
        }

        const order = new Order(uuid(),customer.id, items);
        customer.addRewardPoints(order.total() * 0.5);
        
        return order;
    }

    static total(orders:Order[]) {
        return orders.reduce((acc, order) => {
            return acc + order.total();
        }, 0);
    }
}