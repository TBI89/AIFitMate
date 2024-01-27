class AppConfig {
    public readonly port = process.env.PORT;
    public readonly mongodbConnectionString = process.env.MONGODB_CONNECTION_STRING;
}

class DevelopmentConfig extends AppConfig {
    isDevelopment = true;
    isProduction = false;
}

class ProductionConfig extends AppConfig {
    isDevelopment = true;
    isProduction = false;
}

const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;
