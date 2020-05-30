<template>
  <button class="button" :class="color" @click="handleClick" v-if="type === 'button'">
    <span class="textXS">{{ text }}</span>
  </button>
  <button class="button" :class="color" @click="handleClick" v-else-if="type === 'copy'">
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
  },
  computed: {
    iconSize() {
      const isMobile = window.innerWidth <= 768;
      return isMobile ? "16" : "30";
    }
  }
};
</script>

<style lang="scss">
@import "../assets/config.scss";
.button {
  padding: 30px;
  border: 1px solid;
  width: 440px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  font-weight: 700;
  font-size: 24px;
  span,
  path {
    fill: currentColor;
    transition: all 0.2s ease-in-out;
  }
  &.m-01 {
    background-color: var(--m-01);
    color: var(--neu-05);
    border-color: var(--m-01);
    &:hover {
      background-color: var(--neu-01);
    }
  }
  &.neu-05 {
    background-color: var(--neu-05);
    color: var(--m-01);
    border-color: var(--neu-05);
    &:hover {
      color: var(--neu-05);
      background-color: transparent;
    }
  }
  &.neu-01 {
    background-color: var(--neu-01);
    color: var(--neu-05);
    border-color: var(--neu-05);
    &:hover {
      border-color: var(--m-01);
      path {
        fill: var(--m-01);
      }
    }
  }
  @include phablet {
    width: 100%;
    max-width: 340px;
    font-size: 18px;
    padding: 24px;
  }
  &.small {
    padding: 10px;
    width: auto;
  }
  &.centered {
    margin: 0 auto;
  }
}
</style>
