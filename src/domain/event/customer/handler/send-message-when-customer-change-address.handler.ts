import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangeAdressEvent from "../customer-change-address.event";


export default class SendMessageWhenCustomerIsChangeAddressdHandler implements EventHandlerInterface<CustomerChangeAdressEvent> {

  handle(event: CustomerChangeAdressEvent): void {
    let {id, name, address} = event.dataAddress;
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address.toString()}`)
  }

}