import "reflect-metadata";

import { AppFactory } from "@expressots/core";
import { container } from "./app.container";
import { ServerEnvironment } from "@expressots/adapter-express";
import { App } from "./providers/application/application.provider";
import ENV from "./env";

async function bootstrap() {
  const app = await AppFactory.create(container, App);
  await app.listen(ENV.Application.PORT, ENV.Application.ENVIRONMENT === "Development" ? ServerEnvironment.Development : ServerEnvironment.Production, {
    appName: ENV.Application.APP_NAME,
    appVersion: ENV.Application.APP_VERSION,
  });
}

bootstrap();
