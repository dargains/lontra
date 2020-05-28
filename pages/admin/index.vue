<template>
  <div>
    <h1>ADMIN PAGE</h1>
    <button @click="handleLogout">logout</button>
  </div>
</template>

<script>
import fb from "../../firebase";
import Cookie from "js-cookie";
export default {
  methods: {
    async handleLogout() {
      await fb.auth.signOut();
      await Cookie.remove("access_token");

      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>