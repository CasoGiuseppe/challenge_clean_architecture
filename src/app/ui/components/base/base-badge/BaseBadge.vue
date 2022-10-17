<template>
  <article class="base-badge">
    <ul class="base-badge__list">
      <li
        v-for="(value, key) in properties"
        :key="value"
        :data-label="`${key}:`"
      >
        <slot :property="{ value }" name="properties" />
      </li>
      <li v-if="link" class="base-badge--is-action">
        <button
          class="base-badge__unfold"
          @click="handleClick({ code, link })"
        ></button>
      </li>
    </ul>
    <!-- <aside v-if="$slots['dropdown']" class="base-badge__dropdown">
      <h3 class="base-badge__dropdown-title">Planet info</h3>
      <ul>
        <li v-for="value in content" :key="value">
          <slot :content="{ value }" name="dropdown" />
        </li>
      </ul>
    </aside> -->
  </article>
</template>

<script setup lang="ts">
const prop = defineProps({
  code: {
    type: String,
    default: null,
    required: true,
  },
  properties: {
    type: Object,
    default: () => {},
    required: true,
  },
  link: {
    type: String,
    default: null,
  },
  content: {
    type: Object,
    default: () => {},
  },
});

const clickEmit = defineEmits(["handleClick"]);
const handleClick = ({ code, link }: { code: string; link: string }) =>
  clickEmit("handleClick", { code, link });
</script>

<style lang="scss" src="./BaseBadge.scss" />
