import { UserBuilder } from '../builders/UserBuilder';
import { UserCredentials } from '../../types/testData';
import { ConfigManager } from '../../config/ConfigManager';

/**
 * Object Mother Pattern for User Accounts
 * Provides semantic user archetypes using credentials sourced from ConfigManager.
 */
export class UserMother {
  private static get config() {
    return ConfigManager.getInstance().config;
  }

  /** Standard valid customer account */
  public static standardUser(): UserCredentials {
    return new UserBuilder().build();
  }

  /** Locked out customer account */
  public static lockedOutUser(): UserCredentials {
    return new UserBuilder()
      .withUsername(this.config.users.locked.username)
      .withPassword(this.config.users.locked.password)
      .withDescription('User account locked due to security policy')
      .build();
  }

  /** Problem user account */
  public static problemUser(): UserCredentials {
    return new UserBuilder()
      .withUsername(this.config.users.problem.username)
      .withPassword(this.config.users.problem.password)
      .withDescription('User encountering UI rendering glitches')
      .build();
  }

  /** User with invalid credentials for negative testing */
  public static invalidUser(): UserCredentials {
    return new UserBuilder()
      .withUsername('invalid_user')
      .withPassword('wrong_password')
      .withDescription('User with invalid credentials')
      .build();
  }
}

