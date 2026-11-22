import { ConfigManager, AppConfig } from './ConfigManager';

// Export the singleton configuration instance
export const config: Readonly<AppConfig> = ConfigManager.getInstance().config;
export { ConfigManager, AppConfig };
