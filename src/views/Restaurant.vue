<template>
  <div v-if="user && restaurant && menu">
    <h1>Nome: {{restaurant.name}}</h1>
    <p>Menu:</p>
    <li v-for="menu in menu.items" :key="menu.id">{{ menu.label }}</li>
  </div>
</template>

<script>
export default {
  watch: {
    async restaurant() {
      this.menu = await this.$store.dispatch("getMenu", this.$route.params.id);
    }
  },
  data() {
    return {
      menu: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
    restaurant() {
      return this.$store.getters.getRestaurant(this.$route.params.id);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>