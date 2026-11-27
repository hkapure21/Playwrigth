import dotenv from 'dotenv';
import path from 'path';

export interface UserAccountConfig {
  username: string;
  password: string;
}

export interface AppConfig {
  env: string;
  baseURL: string;
  users: {
    standard: UserAccountConfig;
    locked: UserAccountConfig;
    problem: UserAccountConfig;
  };
}

/**
 * Strict Environment Variable Retriever
 * Throws an explicit error if a required variable is missing or empty.
 * Guarantees a non-null `string` return type for TypeScript.
 */
function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value || value.trim() === '') {
    const currentEnv = process.env.ENV || 'qa';
    throw new Error(
      `CRITICAL CONFIG ERROR: Missing required environment variable "${key}". ` +
      `Ensure it is defined in your ".env.${currentEnv}" file or in GitHub Secrets.`
    );
  }
  return value;
}

/**
 * Singleton Configuration Manager
 * Ensures that configuration is loaded once from the environment-specific .env file
 * and provides a thread-safe, immutable config object across all tests and workers.
 */
export class ConfigManager {
  private static instance: ConfigManager;
  public readonly config: Readonly<AppConfig>;

  private constructor() {
    const currentEnv = process.env.ENV || 'qa';
    const envFilePath = path.resolve(process.cwd(), `.env.${currentEnv}`);

    // Load environment-specific file (.env.qa, .env.staging, etc.)
    dotenv.config({ path: envFilePath });
    // Fallback to default .env if present
    dotenv.config();

    // Strict validation: every variable must be provided
    this.config = Object.freeze({
      env: currentEnv,
      baseURL: getRequiredEnv('BASE_URL'),
      users: {
        standard: Object.freeze({
          username: getRequiredEnv('STANDARD_USER'),
          password: getRequiredEnv('STANDARD_PASSWORD'),
        }),
        locked: Object.freeze({
          username: getRequiredEnv('LOCKED_USER'),
          password: getRequiredEnv('STANDARD_PASSWORD'),
        }),
        problem: Object.freeze({
          username: getRequiredEnv('PROBLEM_USER'),
          password: getRequiredEnv('STANDARD_PASSWORD'),
        }),
      },
    });
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
}
