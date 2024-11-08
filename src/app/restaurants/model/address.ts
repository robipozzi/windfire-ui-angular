export class Address {
  zipCode: string;
  city: string;
  street: string;
  province: string;
  region: string;
  country: string;
  
  constructor( _zipCode: string, _city: string, _street: string, _province: string, _region: string, _country: string ) { 
    this.zipCode = _zipCode;
    this.city = _city;
    this.street = _street;
    this.province = _province;
    this.region = _region;
    this.country = _country
  }
}