import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_items";

let costumer = new Customer("123", "Poliana");
let address = new Address( "Rua 1",123, "21510-650",  "Rio de Janeiro");

costumer.Address = address;
costumer.activate();

const item1 = new OrderItem('1', 'Item 1', 100, '1', 2);
const item2 = new OrderItem('2', 'Item 2', 200, '2', 2);

const order = new Order('1', '123', [item1, item2]);