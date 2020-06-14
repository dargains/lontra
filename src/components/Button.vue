<template>
  <button class="button" :class="color" @click="handleClick" v-if="type === 'button'">
    <span class="textXS">{{ text }}</span>
  </button>
  <router-link :to="link" class="button" :class="color" v-else-if="type === 'link'">
    <span class="textXS">{{ text }}</span>
  </router-link>
  <a :href="link" class="button" :class="color" v-else>
    <span class="textXS">{{ text }}</span>
  </a>
</template>

<script>
export default {
  props: {
    link: String,
    type: String,
    color: String,
    text: String,
    handleClick: Function
  }
};
</script>

<style lang="scss">
@import "../assets/styles/config.scss";
.button {
  @apply inline-flex justify-center py-2 px-8 cursor-pointer text-sm uppercase font-bold rounded-full border border-gray-300;
}
</style>
