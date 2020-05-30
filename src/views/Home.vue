<template>
  <section>
    <Button type="link" text="login" link="/login" color="neu-05" />
    <Button type="link" text="signup" link="/signup" color="neu-05" />
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
@import "../assets/config.scss";
</style>