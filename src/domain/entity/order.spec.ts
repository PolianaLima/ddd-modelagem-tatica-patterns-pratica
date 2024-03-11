import Order from "./order";
import OrderItem from "./order_items";

describe("Order unit test", () => {

    it("should throw an error when id is empty", () => {

        expect(()=>{
            let order = new Order("", "costumerId", []);
        }).toThrowError("Id is required");
        
    });


    it("should throw an error when CustumerId is empty", () => {

        expect(()=>{
            let order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");
        
    });
    
    it("should throw an error when Item is empty", () => {

        expect(()=>{
            let order = new Order("123", "123", []);
        }).toThrowError("Items are required");
        
    });

    it("should calculate total", () => {

        const item1 = new OrderItem("i1", "item1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "item2", 200, "p2", 2);
        const order = new Order("o1", "c1", [item1]);

        let total = order.total();
        
        expect(total).toBe(200);
        
        const order2 = new Order("o1", "c1", [item1, item2]);
        total = order2.total();
        expect(total).toBe(600);
    });

    it("should throw an error if the item qtd is less or equal zero", () => { 
        
        expect(()=>{
            const item1 = new OrderItem("i1", "item1", 100, "p1", 0);
            const order = new Order("o1", "c1", [item1]);

        }).toThrowError("Quantity must be greater than 0");
    
    });

});