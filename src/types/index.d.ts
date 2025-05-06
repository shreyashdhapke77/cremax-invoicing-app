export interface Businesses {
    id: string;
    name: string;
    userId: number;
    cin: string;
    gstin: string;
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    phoneNumber: string;
    website: string;
    email: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

interface GoogleUser {
    email: string;
    email_verified: boolean;
    name: string;
    givenName: string;
    familyName: string;
    picture: string;
    sub: string;
    iat: number;
    exp: number;
    createdAt: string;
    updatedAt: string;
};
export interface Client {
    businessId: string;
    name: string;
    addressLine1: string;
    addressLine2: string,
    postalCode: string,
    state: string,
    city: string,
    country: string,
    cin: string,
    gstin: string,
    email: string,
    cc: string,
    phoneNumber: string,
    status: string,
    fixedDiscount: number
  }

  export interface Product {
    name: string,
    productNo: string,
    price: number,
    taxCode: string,
    totalPrice: number,
    updatedAt: string,
    timesInvoiced: string,
    totalInvoiced: string,
  }