<template>
  <section>
    <div class="wrapper">
      <Button type="link" text="login" link="/login" color="neu-05" />
      <Button type="link" text="signup" link="/signup" color="neu-05" />
    </div>
  </section>
</template>

<script>
// import Icon03 from "../icons/Icon03";
import Button from "../components/Button";

export default {
  components: {
    Button
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/config.scss";
</style>