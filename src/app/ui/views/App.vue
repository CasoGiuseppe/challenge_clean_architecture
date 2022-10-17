<template>
  <section
    :class="[loaderStore.state ? 'is-loading is-blocked' : null, 'root-layout']"
  >
    <header class="root-layout__header">
      <h1>Starwars Heroes</h1>
    </header>

    <section class="root-layout__content">
      <RouterView />
    </section>

    <!-- notification module-->
    <!-- <transition mode="out-in" name="appear-notify">
      <Notification
        v-if="notificationStore.state"
        @close="closeNotification"
        :state="notificationStore.state"
        :type="notificationStore.type"
      >
        <template #message> {{ notificationStore.message }} </template>
      </Notification>
    </transition> -->
  </section>
</template>

<script setup lang="ts">
import { inject } from "vue";
// import { RouterView } from "vue-router";

// store
import { useCosmeticStore } from "@/app/shared/stores/cosmetic";
import {
  GET_LOADER_STATE,
  // GET_NOTIFICATION_MODE,
} from "@/app/shared/stores/cosmetic/getters";
import { storeToRefs } from "pinia";

// // usecase
// import { UseNotifications } from "@/domains/starwars/core";

// // components
// import Notification from "@/app/ui/components/base/base-notification/BaseNotification.vue";

// // destructuring usecase
// const { onErrorMessage } = UseNotifications();

// cosmetic pina
const cosmeticStore = useCosmeticStore();
const cosmeticRefs = storeToRefs(cosmeticStore);
const loaderStore = cosmeticRefs[GET_LOADER_STATE].value;
// const notificationStore = cosmeticRefs[GET_NOTIFICATION_MODE].value;

// // actions
// const closeNotification = () => onErrorMessage({});
</script>
<style lang="scss" src="@/assets/styles/index.scss" />
