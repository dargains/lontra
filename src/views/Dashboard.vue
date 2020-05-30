<template>
  <div>
    <h1>dashboard</h1>
    <p class>Olá {{ userProfile.name }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["company", "userProfile"])
  }
};
</script>

<style lang="scss" scoped>
</style>