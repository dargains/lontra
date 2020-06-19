<template>
  <div>
    <h1>dashboard</h1>
    <p class>Olá {{ userProfile.name }}</p>
    <h2>restaurantes:</h2>
    <p v-for="restaurant in restaurants" :key="restaurant.id">
      <router-link :to="{ name: 'Restaurant', params: { id:restaurant.id }}">{{restaurant.name}}</router-link>
      <img
        :src="'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + 'https://lucid-lumiere-6b283a.netlify.app/' + '/restaurant/' + restaurant.id"
        alt
      />
    </p>
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