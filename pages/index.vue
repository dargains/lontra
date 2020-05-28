<template>
  <div>
    <h1>login</h1>
    <form @submit.prevent>
      <label for="email">
        <input type="text" placeholder="email" v-model="email" />
      </label>
      <label for="password">
        <input type="password" placeholder="password" v-model="password" />
      </label>
      <button @click="onSubmit">login</button>
    </form>
    <p v-if="error">{{errorMessage}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    onSubmit() {
      // if (!!this.email && !!this.password)
      this.$store
        .dispatch("users/login", {
          email: this.email,
          password: this.password
        })
        .catch(error => {
          this.error = true;
          this.errorMessage = error;
          setTimeout(() => {
            this.error = false;
            this.errorMessage = "";
          }, 3000);
        });
      this.$router.push("/admin");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>