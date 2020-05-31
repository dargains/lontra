<template>
  <div>restaurantid: {{restaurantId}}</div>
</template>

<script>
export default {
  computed: {
    restaurantId() {
      return this.$route.params.id;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>