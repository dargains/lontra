<template>
  <div>
    <h1>dashboard</h1>
    <p class>Olá {{ userProfile.name }}</p>
    <h2>restaurantes:</h2>
    <p v-for="restaurant in restaurants" :key="restaurant.id">{{restaurant.name}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["restaurants", "userProfile"])
  }
};
</script>

<style lang="scss" scoped>
</style>