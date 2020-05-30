<template>
  <div>
    <p @click="logout">logout</p>
  </div>
</template>

<script>
import fb from "../firebase";
export default {
  methods: {
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.commit("clearData");
          this.$router.push("/");
        })
        .catch(() => {
          // console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>