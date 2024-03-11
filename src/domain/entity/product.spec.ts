import Product from "./product";

describe("Product unit test", () => {

    it("should throw an error when id is empty", () => {

        expect(()=>{
            const product = new Product("", "Procuct", 100);
        }).toThrowError("Id is required");
        
    });

    it("should throw an error when name is empty", () => {

        expect(()=>{
            const product = new Product("123", "", 100);
        }).toThrowError("Name is required");
        
    });

    it("should throw an error when price is less than zero", () => {

        expect(()=>{
            const product = new Product("123", "Product", -1);
        }).toThrowError("Price must be greater than zero");
        
    });

    
    it("should change name", () => {
        const product = new Product("123", "Product", 100);
        product.changeName("New Product");

        expect(product.name).toBe("New Product");
        
    });

    it("should change price", () => {
        const product = new Product("123", "Product", 100);
        product.changePrice(450);
        
        expect(product.price).toBe(450);
        
    });

});