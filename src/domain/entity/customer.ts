import Address from "./address";

export default class Customer{

    private _id:string;
    private _name:string;
    private _address!: Address;
    private _active:boolean = true;
    private _rewardPoints:number = 0;

    constructor(id:string, name:string){
        this._id = id;
        this._name = name;
        this.validate();
    }  

    get name(){
        return this._name;
    }

    get rewardPoints():number{
        return this._rewardPoints;
    }

    get id():string{
        return this._id;
    }

    validate(){
        if(this._id.length ===0){
            throw new Error('Id is required');
        }
        if(this._name.length === 0){
            throw new Error('Name is required');
        }
    }

    changeName(name:string){
        this._name = name;
    }

    get Address(): Address {
        return this._address;
    }
    
    changeAddress(address: Address) {
        this._address = address;
    }


    isActivate(){
        return this._active;
    }

    activate(){
        if(this._address === undefined){
            throw new Error('Address is mandatory to activate the customer');
        }
        this._active = true;
    }

    desactivate(){
        this._active = false;
    }

    addRewardPoints(points:number){
        this._rewardPoints += points;
    }

    set Address(adress:Address){
        this._address = adress;
    }
}