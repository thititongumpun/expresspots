import pkg from "../package.json";

const ENV = {
    Application: {
        APP_NAME: pkg.name,
        APP_VERSION: pkg.version,
        ENVIRONMENT: process.env.ENVIRONMENT as string,
        PORT: Number(process.env.PORT),
    },
    Broker: {
      BROKER_URL: process.env.BROKER_URL as string,
      BROKER_USERNAME: process.env.BROKER_USERNAME as string,
      BROKER_PASSWORD: process.env.BROKER_PASSWORD as string,
    }
};

export default ENV;
