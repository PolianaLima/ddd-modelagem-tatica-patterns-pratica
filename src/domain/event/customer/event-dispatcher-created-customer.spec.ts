import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendEmailWhenCustomerIsCreatedHandler from "./handler/send-email-when-customer-created.handler";

describe("Domain events tests created customer", () => {

  it("should register an event handler of a customer", () => {

    const eventDispatcher = new EventDispatcher();
    const eventHandlerFirst = new SendEmailWhenCustomerIsCreatedHandler();
    // const eventHandlerSecond = new SendEmailWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerFirst);
    // eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecond)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerFirst)
    // expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerSecond)

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Lucian Tavares",
      street: "Rua 123",
      number: 99,
      zipcode: "88888-888",
      city: "Criciúma",
    })

    eventDispatcher.notify(customerCreatedEvent)
  })


})