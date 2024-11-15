import { Address } from "./address";

export class Restaurant {
  id: string | null;
  name: string | null | undefined;
  address: Address;
  phoneLabel: string | null | undefined;
  mobileLabel: string | null | undefined;
  emailLabel: string | null | undefined;
  websiteLabel: string | null | undefined;
  cuisine: string | null | undefined;
  
  constructor( _id: string, 
              _name: string | null | undefined,
              _address: Address, 
              _phoneLabel: string | null | undefined,
              _mobileLabel: string | null | undefined,
              _emailLabel: string | null | undefined,
              _websiteLabel: string | null | undefined,
              _cuisine: string | null | undefined, ) {
    this.id = _id;
    if (_id === '') {
      this.id = null;
    }
    this.name = _name;
    this.address = _address;
    this.phoneLabel = _phoneLabel;
    this.mobileLabel = _mobileLabel;
    this.emailLabel = _emailLabel;
    this.websiteLabel = _websiteLabel;
    this.cuisine = _cuisine;
  }

}