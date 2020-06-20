<template>
  <div id="app">
    <!-- <Header /> -->
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
// import Header from "./components/Header";
export default {
  components: {
    // Header
  },
  computed: {
    ...mapState(["loading"])
  }
};
</script>
<style lang="scss">
@import "./assets/styles/config.scss";
</style>
