export interface UserCredentials {
  username: string;
  password?: string;
  description?: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface ProductInfo {
  name: string;
  price?: string;
  description?: string;
}

/**
 * Data-Driven Test Case definition for checkout validations
 */
export interface CheckoutValidationCase {
  scenario: string;
  customer: CustomerInfo;
  expectedError: string;
}
