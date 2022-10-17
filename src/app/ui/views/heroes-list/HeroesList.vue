<template>
  <section class="heroes-list">
    <TransitionGroup
      tag="ul"
      name="appear-teams-item"
      class="heroes-list__table"
      @after-enter="endEnterEvent"
    >
      <template v-if="heroesResultsRef?.list?.length > 0">
        <li
          v-for="(
            { id, name, height, skin, eyes, birth, gender, url }, index
          ) in heroesResultsRef.list"
          :key="id"
          :style="{ transitionDelay: `${index * 0.1}s` }"
          class="heroes-list__row"
        >
          <BaseBadge
            :code="id"
            :properties="{
              name,
              height,
              skin,
              eyes,
              birth,
              gender,
            }"
            :link="url"
          >
            <template #properties="{ property }">{{
              Object.values(property).toString()
            }}</template>
          </BaseBadge>
        </li>
      </template>
    </TransitionGroup>
    <footer class="heroes-list__footer">
      <ul class="heroes-list__footer__list">
        <li>
          <BaseButton
            id="previous"
            :is-disabled="heroesResultsRef?.prev === null"
            @handleClick="navigate"
          >
            {{ PREV_PAGE }}</BaseButton
          >
        </li>
        <li>
          <BaseButton
            id="next"
            :is-disabled="heroesResultsRef?.next === null"
            @handleClick="navigate"
          >
            {{ NEXT_PAGE }}
          </BaseButton>
        </li>
      </ul>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { inject, onBeforeMount, reactive } from "vue";
import type { SuperheroesService } from "@/domains/superheroes/application/use-cases";
import { NEXT_PAGE, PREV_PAGE } from "@/app/partials/labels";

// components
import BaseBadge from "@/app/ui/components/base/base-badge/BaseBadge.vue";
import BaseButton from "@/app/ui/components/base/base-button/BaseButton.vue";

const heroesServices = inject<SuperheroesService>("heroesServices");
const heroesResultsRef = reactive<any>({
  next: null,
  previpus: null,
  list: null,
});

const setNewTableParams = (dataTableResponse: any): void => {
  heroesResultsRef.list = dataTableResponse?.tableResults;
  heroesResultsRef.prev = dataTableResponse?.navigationPrev;
  heroesResultsRef.next = dataTableResponse?.navigationNext;
};

const navigate = async (pageType: string) =>
  setNewTableParams(await heroesServices?.navigateByPage(pageType));

const endEnterEvent = async (e: Element) => e.removeAttribute("style");

onBeforeMount(async () =>
  setNewTableParams(await heroesServices?.getResponseAPIByPage())
);
</script>
<style lang="scss" src="./HeroesList.scss" />
