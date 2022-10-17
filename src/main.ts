import { createApp } from "vue";
import pinia from "@/app/shared/stores/pinia";
import App from "@/app/ui/views/App.vue";
import router from "@/app/router";

import { SuperheroesController } from "@/domains/superheroes/infrastructure/Superheroes.controller";
import { SuperheroesService } from "@/domains/superheroes/application/use-cases";
import { HTTPService } from "@/app/shared/services/http/http.services";
import { useHeroesStore } from "./domains/superheroes/infrastructure/store";
import { NotificationService } from "@/app/shared/services/notification/notification.services";
import { useCosmeticStore } from "./app/shared/stores/cosmetic";
import { UUIDService } from "./app/shared/services/uuid/uuid.services";

const app = createApp(App);

app.use(pinia);
app.use(router);

const heroesStore = useHeroesStore();
const commonStore = useCosmeticStore();

const clientService = new HTTPService();
const notificationService = new NotificationService(commonStore);
const uuidService = new UUIDService();
const heroesResources = new SuperheroesController(
  clientService,
  heroesStore,
  notificationService,
  uuidService
);
const heroesServices = new SuperheroesService(heroesResources);

app.mount("#app");
app.provide<SuperheroesService>("heroesServices", heroesServices);
