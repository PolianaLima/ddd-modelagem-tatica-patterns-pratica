import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class SendMessageWhenCustomerIsChangeHandler 
    implements EventHandlerInterface<CustomerChangeAddressEvent>{

    handle(event: CustomerChangeAddressEvent): void {

        let {id, name, address} = event.eventData;

        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address.toString()}`)
    }

        
}