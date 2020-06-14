<template>
  <div class="wrapper" v-if="user && restaurant && menu">
    <h1>Nome: {{restaurant.name}}</h1>
    <p>Menu:</p>
    <div v-for="category in menu.categories" :key="category.label" class="my-4 w-1/3">
      <h2 class="font-xl">{{ category.label }}</h2>
      <ul>
        <li
          v-for="dish in category.dishes"
          :key="dish.label"
          class="flex items-center justify-between"
        >
          <p>{{ dish.label }}</p>
          <p>{{ dish.price }}</p>
        </li>
      </ul>
    </div>
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