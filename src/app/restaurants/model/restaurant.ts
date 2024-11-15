import { Address } from "./address";

export class Restaurant {
  id: string | null;
  name: string | null | undefined;
  address: Address;
  phone: string | null | undefined;
  mobile: string | null | undefined;
  email: string | null | undefined;
  website: string | null | undefined;
  cuisine: string | null | undefined;
  
  constructor( _id: string, 
              _name: string | null | undefined,
              _address: Address, 
              _phone: string | null | undefined,
              _mobile: string | null | undefined,
              _email: string | null | undefined,
              _website: string | null | undefined,
              _cuisine: string | null | undefined, ) {
    this.id = _id;
    if (_id === '') {
      this.id = null;
    }
    this.name = _name;
    this.address = _address;
    this.phone = _phone;
    this.mobile = _mobile;
    this.email = _email;
    this.website = _website;
    this.cuisine = _cuisine;
  }

}