import { Address } from "./address";

export class Restaurant {
  id: string;
  restaurant_id: string;
  name: string;
  address: Address;
  cuisine: string;
  
  constructor( _id: string, _restaurant_id: string, _name: string, _address: Address, _cuisine: string ) { 
    this.id = _id,
    this.restaurant_id = _restaurant_id,
    this.name = _name,
    this.address = _address;
    this.cuisine = _cuisine;
  }
}