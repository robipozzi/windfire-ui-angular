import { Address } from "./address";

export class Restaurant {
  id: string | null;
  name: string | null | undefined;
  address: Address;
  cuisine: string | null | undefined;
  
  constructor( _id: string, _name: string | null | undefined, _address: Address, _cuisine: string | null | undefined ) {
    this.id = _id;
    if (_id === '') {
      this.id = null;
    }
    this.name = _name;
    this.address = _address;
    this.cuisine = _cuisine;
  }

}