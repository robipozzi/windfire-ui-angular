import { Address } from "./address";

export class Restaurant {
  id: string;
  name: string;
  address: Address;
  cuisine: string;
  
  constructor( _id: string, _name: string, _address: Address, _cuisine: string ) { 
    this.id = _id;
    this.name = _name;
    this.address = _address;
    this.cuisine = _cuisine;
  }
}