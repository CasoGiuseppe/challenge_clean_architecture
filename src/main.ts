import { createApp } from "vue";
import pinia from "@/app/shared/stores/pinia";
import App from "@/app/ui/views/App.vue";
import router from "@/app/router";

import { SuperheroesService } from "@/domains/superheroes/application/use-cases";
import { HTTPService } from "@/app/shared/services/http/http.services";
import { useHeroesStore } from "./domains/superheroes/infrastructure/persistDataAdapter/store";
import { NotificationService } from "@/app/shared/services/notification/notification.services";
import { useCosmeticStore } from "./app/shared/stores/cosmetic";
import { UUIDService } from "./app/shared/services/uuid/uuid.services";
import { ManageDataAdapter } from "./domains/superheroes/infrastructure/manageDataAdapter/ManageData.adapter";
import { NotificationAdapter } from "./domains/superheroes/infrastructure/notificationAdapter/Notification.adapter";
import { PersistDataAdapter } from "./domains/superheroes/infrastructure/persistDataAdapter/PersistData.adapter";

const app = createApp(App);

app.use(pinia);
app.use(router);

const domainStore = useHeroesStore();
const commonStore = useCosmeticStore();

// services to use in adapters
const clientService = new HTTPService();
const notificationService = new NotificationService(commonStore);
const uuidService = new UUIDService();

// adapters
const manageDataAdapter = new ManageDataAdapter(clientService, uuidService);
const notificationAdapter = new NotificationAdapter(notificationService);
const persistAdapter = new PersistDataAdapter(domainStore);

// usecase orchestrateur
const heroesServices = new SuperheroesService(
  manageDataAdapter,
  notificationAdapter,
  persistAdapter
);

app.mount("#app");
app.provide<SuperheroesService>("heroesServices", heroesServices);
