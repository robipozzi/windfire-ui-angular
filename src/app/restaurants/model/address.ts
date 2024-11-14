export class Address {
  zipCode: string | null | undefined;
  city: string | null | undefined;
  street: string | null | undefined;
  province: string | null | undefined;
  region: string | null | undefined;
  country: string | null | undefined;
  
  constructor( _zipCode: string | null | undefined, 
              _city: string | null | undefined, 
              _street: string | null | undefined, 
              _province: string | null | undefined, 
              _region: string | null | undefined, 
              _country: string | null | undefined ) { 
    this.zipCode = _zipCode;
    this.city = _city;
    this.street = _street;
    this.province = _province;
    this.region = _region;
    this.country = _country
  }
}