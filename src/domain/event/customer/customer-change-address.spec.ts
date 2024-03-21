import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerChangeAddressEvent from "./customer-change-address.event";
import SendMessageWhenCustomerIsChangeHandler from "./handler/send-message-when-custoer-change.handler";

describe("Domain events tests change address customer", () => {

    it("should notify event handlers of a customer", () => {
        const eventDispatcher  = new EventDispatcher();
        const eventHandlerChangeAddress = new SendMessageWhenCustomerIsChangeHandler();

        const spyEventHandlerChangeAddress = jest.spyOn(eventHandlerChangeAddress, "handle");

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandlerChangeAddress);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();

        const customer = new Customer("123", "John Doe");
        const address = new Address("Street 1", 99, "25654-635", "City 01");
        const newAddress = new Address("Street 1", 99, "25654-635", "City 01");

        customer.changeAddress(address);

        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            id:customer.id,
            name: customer.name,
            address: newAddress
        });

        eventDispatcher.notify(customerChangeAddressEvent);

        expect(spyEventHandlerChangeAddress).toHaveBeenCalled();

    });
});