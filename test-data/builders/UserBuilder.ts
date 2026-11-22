import { UserCredentials } from '../../types/testData';
import { ConfigManager } from '../../config/ConfigManager';

/**
 * Builder Pattern for UserCredentials
 * Encapsulates user construction with credentials loaded securely from ConfigManager.
 */
export class UserBuilder {
  private credentials: UserCredentials;

  constructor() {
    const config = ConfigManager.getInstance().config;
    this.credentials = {
      username: config.users.standard.username,
      password: config.users.standard.password,
      description: 'Standard active user',
    };
  }

  public withUsername(username: string): this {
    this.credentials.username = username;
    return this;
  }

  public withPassword(password: string): this {
    this.credentials.password = password;
    return this;
  }

  public withDescription(description: string): this {
    this.credentials.description = description;
    return this;
  }

  public build(): UserCredentials {
    return { ...this.credentials };
  }
}

