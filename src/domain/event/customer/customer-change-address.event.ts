import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

type addressCustomerChange = {
    id: string,
    name: string,
    address: Address

}

export default class CustomerChangeAddressEvent implements EventInterface{
    dataTimeOccured: Date;
    eventData: addressCustomerChange;

    constructor(eventData: any) {
        this.dataTimeOccured = new Date()
        this.eventData = eventData
    }
}