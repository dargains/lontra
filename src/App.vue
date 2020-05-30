<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
import Header from "./components/Header";
export default {
  components: {
    Header
  },
  computed: {
    ...mapState(["loading"])
  }
};
</script>
<style lang="scss">
@import "./assets/config.scss";
:root {
  --m-01: #27f88e;
  --m-02: #f82727;
  --neu-01: #ffffff;
  --neu-02: #fafafa;
  --neu-03: #f2f2f2;
  --neu-04: #c3c3c3;
  --neu-05: #181818;
}

.wrapper {
  max-width: 1200px;
  width: 100%;
  padding: 0 32px;
  margin: 0 auto;
  @include phablet {
    padding: 0 16px;
  }
}
.sawBottom {
  background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    ),
    linear-gradient(
      -45deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  background-position: bottom center, bottom center;
  background-size: 0.75rem 0.75rem, 0.75rem 0.75rem, 0.75rem 0.75rem,
    0.75rem 0.75rem;
  background-repeat: repeat-x;
}
.m-01 {
  color: var(--m-01);
}
.m-02 {
  color: var(--m-02);
}
.neu-05 {
  color: var(--neu-05);
}
.error {
  color: var(--m-02);
}
.mb48 {
  margin-bottom: 48px;
}
.mb24 {
  margin-bottom: 24px;
}
.bold {
  font-weight: 700;
}
.fontXL {
  font-size: 72px;
  @include phablet {
    font-size: 48px;
  }
}
.fontL {
  font-size: 48px;
  line-height: 52px;
  @include phablet {
    line-height: 40px;
    font-size: 36px;
  }
}
.fontM {
  font-size: 30px;
  line-height: 36px;
  @include phablet {
    font-size: 24px;
  }
}
.fontS {
  font-size: 30px;
  line-height: 34px;
  @include phablet {
    line-height: 30px;
    font-size: 24px;
  }
}
.fontXS {
  font-size: 24px;
  line-height: 28px;
  @include phablet {
    line-height: 22px;
    font-size: 18px;
  }
}
.fontXXS {
  font-size: 18px;
  line-height: 22px;
}
#app {
  font-family: "Space Mono", monospace;
  letter-spacing: -1px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--neu-05);
}
.inputContainer {
  input[type="text"],
  input[type="password"],
  input[type="email"] {
    border-radius: 0;
    width: 100%;
    border: 0;
    border-bottom: 2px solid var(--neu-05);
    padding: 10px 0;
    color: var(--neu-05);
    font-size: 24px;
    font-weight: 700;
    font-family: "Space Mono", monospace;
    padding-right: 40px;
    background-color: transparent;
  }
  svg {
    position: absolute;
    right: 0;
    top: 15px;
    cursor: pointer;
  }
  span {
    margin-top: 10px;
    display: block;
  }
  @include phablet {
    input[type="text"],
    input[type="password"],
    input[type="email"] {
      font-size: 18px;
    }
    svg {
      top: 18px;
      height: 16px;
      width: 16px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
