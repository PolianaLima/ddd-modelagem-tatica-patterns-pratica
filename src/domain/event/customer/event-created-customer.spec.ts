import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendEmailWhenCustomerIsCreatedHandler from "./handler/send-email-when-customer-created.handler";
import SendMessageWhenCustomerIsCreatedHandler from "./handler/send-message-when-customer-created.handler";

describe("Domain events tests created customer", () => {

  it("should register an event handler of a customer", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandlerFirst = new SendEmailWhenCustomerIsCreatedHandler();
    const eventHandlerSecond = new SendMessageWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerFirst);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecond)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerFirst)
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerSecond)
  });

  it("should unregister an event handler of a customer", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandlerFirst = new SendEmailWhenCustomerIsCreatedHandler();
    const eventHandlerSecond = new SendMessageWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerFirst);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecond)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerFirst);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerSecond);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandlerFirst);
    eventDispatcher.unregister("CustomerCreatedEvent", eventHandlerSecond);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);

  });

  it("should unregister all event handlers of a customer", () => {
      
      const eventDispatcher = new EventDispatcher();
      const eventHandlerFirst = new SendEmailWhenCustomerIsCreatedHandler();
      const eventHandlerSecond = new SendMessageWhenCustomerIsCreatedHandler();
  
      eventDispatcher.register("CustomerCreatedEvent", eventHandlerFirst);
      eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecond)
  
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerFirst);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerSecond);
  
      eventDispatcher.unregisterAll();
  
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
  });

  it("should notify event handlers of a customer", () => {
    
    const eventDispatcher = new EventDispatcher();
    const eventHandlerFirst = new SendEmailWhenCustomerIsCreatedHandler();
    const eventHandlerSecond = new SendMessageWhenCustomerIsCreatedHandler();

    const spyEventHandlerFirst = jest.spyOn(eventHandlerFirst, "handle");
    const spyEventHandlerSecond = jest.spyOn(eventHandlerSecond, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerFirst);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecond);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerFirst);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerSecond);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id:"123",
      name: "John Doe",
      street:"Street 01",
      city:"City 01",
      number:123,
      zipCode:"12456-789",
  });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandlerFirst).toHaveBeenCalledTimes(1);
    expect(spyEventHandlerSecond).toHaveBeenCalledTimes(1);


});


});