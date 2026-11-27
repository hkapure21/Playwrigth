import { CustomerMother } from './mothers/CustomerMother';
import { CustomerBuilder } from './builders/CustomerBuilder';
import { CustomerInfo, CheckoutValidationCase } from '../types/testData';
import { messagesData } from './messages.data';

/**
 * Re-exports customer data archetypes using CustomerMother
 */
export const checkoutData = {
  validCustomer: CustomerMother.valid() satisfies CustomerInfo,
  missingPostalCode: CustomerMother.missingPostalCode() satisfies CustomerInfo,
};

/**
 * Data-Driven testing matrix for checkout form validations.
 * Centralized here to keep test files clean and free of data definitions.
 */
export const checkoutValidationCases: CheckoutValidationCase[] = [
  {
    scenario: 'Missing First Name',
    customer: new CustomerBuilder().withoutFirstName().build(),
    expectedError: messagesData.errors.firstNameRequired,
  },
  {
    scenario: 'Missing Last Name',
    customer: new CustomerBuilder().withoutLastName().build(),
    expectedError: messagesData.errors.lastNameRequired,
  },
  {
    scenario: 'Missing Postal Code',
    customer: new CustomerBuilder().withoutPostalCode().build(),
    expectedError: messagesData.errors.postalCodeRequired,
  },
];
