import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerChangeAdressEvent from "./customer-change-address.event";
import SendMessageWhenCustomerIsChangeAddressdHandler from "./handler/send-message-when-customer-change-address.handler";

describe("CustomerChangeAddressEvent", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMessageWhenCustomerIsChangeAddressdHandler();

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toBe(
            eventHandler
        );
    });


    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMessageWhenCustomerIsChangeAddressdHandler();

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toBe(
            eventHandler
        );

        eventDispatcher.unregister("CustomerChangeAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMessageWhenCustomerIsChangeAddressdHandler();

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toBe(
            eventHandler
        );

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeUndefined();
    });


    it("should notify event handlers",() => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerChangeAddress = new SendMessageWhenCustomerIsChangeAddressdHandler();

        const spyEventHandlerChangeAddress = jest.spyOn(eventHandlerChangeAddress, "handle")

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandlerChangeAddress);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandlerChangeAddress);

        const customer = new Customer("1", "John Doe");
        const address = new Address("Rua 1", 123, "12345-123", "São Paulo");
        customer.Address = address;

        const newAddress = new Address("Rua 2", 456, "54321-321", "Rio de Janeiro");

        const customerChangeAddressEvent = new CustomerChangeAdressEvent({
            id: customer.id,
            name: customer.name,
            address: newAddress
        });

        eventDispatcher.notify(customerChangeAddressEvent);

        expect(spyEventHandlerChangeAddress).toHaveBeenCalled();

    });
});