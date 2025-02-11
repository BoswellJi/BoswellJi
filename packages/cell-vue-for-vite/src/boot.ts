import "reflect-metadata";
import "setimmediate";
import { Container } from "inversify";
import { Application } from "@celljs/core/lib/common/application/application-protocol";
import { ContainerProvider } from "@celljs/core/lib/common/container/container-provider";
import { currentThis } from "@celljs/core/lib/common/utils";
import commonModule from "@celljs/core/lib/common/static-module";
import browserModule from "@celljs/core/lib/browser/static-module";

function bootstrap() {
  currentThis.cellProps = {
    cell: {
      hostDomId: "app",
    },
  };
  const container = new Container({ skipBaseClassChecks: true });
  container.load(commonModule, browserModule);
  import("@celljs/vue/lib/browser/module")
    .then((res) => container.load(res.default))
    .then(() => import("./module"))
    .then((res) => container.load(res.default))
    .then(() => {
      ContainerProvider.set(container);
      const application = container.get<Application>(Application);
      application.start().catch((reason) => {
        console.error(`Failed to start the ${application.constructor.name}.`);
        if (reason) {
          console.error(reason);
        }
      });
    });
}

bootstrap();
