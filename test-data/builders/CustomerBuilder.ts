import { CustomerInfo } from '../../types/testData';

/**
 * Builder Pattern for CustomerInfo
 * Provides default valid customer values and fluent chained methods for customization.
 */
export class CustomerBuilder {
  private customer: CustomerInfo;

  constructor() {
    this.customer = {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345',
    };
  }

  public withFirstName(firstName: string): this {
    this.customer.firstName = firstName;
    return this;
  }

  public withLastName(lastName: string): this {
    this.customer.lastName = lastName;
    return this;
  }

  public withPostalCode(postalCode: string): this {
    this.customer.postalCode = postalCode;
    return this;
  }

  public withoutPostalCode(): this {
    this.customer.postalCode = '';
    return this;
  }

  public withoutFirstName(): this {
    this.customer.firstName = '';
    return this;
  }

  public withoutLastName(): this {
    this.customer.lastName = '';
    return this;
  }

  public build(): CustomerInfo {
    // Return a fresh copy to prevent accidental mutations across tests
    return { ...this.customer };
  }
}

