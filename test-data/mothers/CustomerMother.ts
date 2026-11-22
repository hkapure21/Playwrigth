import { CustomerBuilder } from '../builders/CustomerBuilder';
import { CustomerInfo } from '../../types/testData';

/**
 * Object Mother Pattern for Customer Data
 * Pre-defines named semantic archetypes commonly needed across tests.
 */
export class CustomerMother {
  /** Returns a standard valid customer */
  public static valid(): CustomerInfo {
    return new CustomerBuilder().build();
  }

  /** Returns customer with empty postal code for validation testing */
  public static missingPostalCode(): CustomerInfo {
    return new CustomerBuilder().withoutPostalCode().build();
  }

  /** Returns customer with empty first name */
  public static missingFirstName(): CustomerInfo {
    return new CustomerBuilder().withoutFirstName().build();
  }

  /** Returns customer with empty last name */
  public static missingLastName(): CustomerInfo {
    return new CustomerBuilder().withoutLastName().build();
  }

  /** Returns a customer with custom attributes */
  public static custom(firstName: string, lastName: string, postalCode: string): CustomerInfo {
    return new CustomerBuilder()
      .withFirstName(firstName)
      .withLastName(lastName)
      .withPostalCode(postalCode)
      .build();
  }
}

