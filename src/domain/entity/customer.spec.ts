import Address from "./address";
import Customer from "./customer";

describe("Customer unit test", () => {

    it("should throw an error when id is empty", () => {
        expect(() => new Customer("",  "name")).toThrowError("Id is required");
    });

    it("should throw an error when name is empty", () => {
        expect(() => new Customer("123",  "")).toThrowError("Name is required");
    });

    it("should change name", () => {

        const customer = new Customer("123",  "Jhon");
        customer.changeName("Jhon Doe");
        
        expect(customer.name).toBe("Jhon Doe");

    });

    it("should activate customer", () => {

        const customer = new Customer("123",  "Jhon");
        const address = new Address("Street 01", 123, "21510-510", "city");
        customer.Address = address;

        customer.activate();

        expect(customer.isActivate()).toBe(true);
    })

    
    it("should throw when address is undefined when ypu activate a customer", () => {

        expect(()=>{
            const customer = new Customer("123",  "Jhon");
            customer.activate();
        }).toThrowError("Address is mandatory to activate the customer");
    })


    it("should deactivete customer", () => {
        const customer = new Customer("123",  "Jhon");
        customer.desactivate();
        expect(customer.isActivate()).toBe(false);
    })

    it("should add reward points", () => {
        const customer = new Customer("123",  "Jhon");

        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(20);
    });

});