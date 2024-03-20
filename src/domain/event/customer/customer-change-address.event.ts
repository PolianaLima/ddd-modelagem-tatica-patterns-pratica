import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

type dataChangeAddress = {
    id: string,
    name: string,
    address: Address;
}


export default class CustomerChangeAdressEvent implements EventInterface{

    dataTimeOccured: Date;
    eventData: dataChangeAddress;

    constructor(eventData: dataChangeAddress){
        this.dataTimeOccured = new Date();
        this.eventData = eventData;
    }

    get dataAddress(){
        return this.eventData;
    }

}