<template>
  <div class="wrapper" v-if="restaurant && menu">
    <h1>Nome: {{restaurant.name}}</h1>
    <p>Menu:</p>
    <div v-for="category in menu.categories" :key="category.label" class="my-4 p-4 w-1/3 border">
      <h2 class="font-xl">{{ category.label }} - {{category.dishes.length}} ofertas</h2>
      <ul>
        <li
          v-for="dish in category.dishes"
          :key="dish.label"
          class="flex items-center justify-between py-6"
        >
          <p>{{ dish.label }}</p>
          <div>
            <p class="text-right">{{ dish.price.toFixed(2).replace(".",",") }} €</p>
            <p class="text-right" v-if="dish.size">{{ dish.size }}</p>
          </div>
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
    restaurant() {
      return this.$store.getters.getRestaurant(this.$route.params.id);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>