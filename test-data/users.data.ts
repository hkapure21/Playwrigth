import { UserMother } from './mothers/UserMother';
import { UserCredentials } from '../types/testData';

/**
 * Standard test user accounts backed by the UserMother pattern.
 * Retains existing property names for backward compatibility.
 */
export const testUsers = {
  standardUser: UserMother.standardUser() satisfies UserCredentials,
  lockedOutUser: UserMother.lockedOutUser() satisfies UserCredentials,
  problemUser: UserMother.problemUser() satisfies UserCredentials,
  invalidUser: UserMother.invalidUser() satisfies UserCredentials,
};
