<template>
  <div v-if="user && restaurant">
    <p>{{$route.params.id}}</p>
    <h1>{{restaurant.name}}</h1>
    <p>Menus</p>
    <li v-for="menu in menus" :key="menu.id">{{ menu.restaurant }}</li>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
    restaurant() {
      return this.$store.getters.getRestaurant(this.$route.params.id);
    },
    menus() {
      return this.$store.state.menus;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>