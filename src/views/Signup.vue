<template>
  <section class="signup">
    <div class="wrapper">
      <form @submit.prevent>
        <div class="inputContainer">
          <p class="fontM bold m-01">Email:</p>
          <input v-model.trim="email" type="email" placeholder="email" id="email2" />
          <span class="error" v-if="emailError">Falta o email</span>
        </div>

        <div class="inputContainer">
          <p class="fontM bold m-01">Nome:</p>
          <input v-model.trim="name" type="text" placeholder="nome" id="name" />
          <span class="error" v-if="nameError">Falta o nome</span>
        </div>

        <div class="inputContainer">
          <p class="fontM bold m-01">Password:</p>
          <input
            v-model.trim="password"
            type="password"
            placeholder="min 6 caracteres"
            id="password2"
          />
          <span class="error" v-if="passwordError">Falta a password</span>
        </div>

        <div class="inputContainer">
          <p class="fontM bold m-01">Nome da Empresa:</p>
          <input
            type="text"
            id="restaurant"
            v-model.trim="restaurant"
            placeholder="nome da empresa"
          />
          <span class="error" v-if="restaurantError">Falta o nome da empresa</span>
        </div>
        <Button type="button" color="m-01" :handleClick="checkForm" text="Finalizar" />
        <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
  </section>
</template>

<script>
import fb from "../firebase";
import Button from "../components/Button";

export default {
  components: {
    Button
  },
  data() {
    return {
      errorMessage: "",
      name: "",
      nameError: false,
      restaurant: "",
      restaurantError: false,
      email: "",
      emailError: false,
      password: "",
      passwordError: false
    };
  },
  methods: {
    checkForm() {
      this.nameError = this.name === "";
      this.restaurantError = this.restaurant === "";
      this.emailError = this.email === "";
      this.passwordError = this.password === "";
      if (
        this.nameError ||
        this.restaurantError ||
        this.emailError ||
        this.passwordError
      )
        return;
      this.signup();
    },
    async signup() {
      this.errorMessage = "";
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      this.$store.commit("setCurrentUser", user);
      const restaurantId = fb.restaurantsCollection.doc().id;
      const menuId = fb.menusCollection.doc().id;
      // create user obj
      await fb.usersCollection.doc(user.uid).set({
        name: this.name,
        email: this.email,
        restaurants: [restaurantId]
      });
      // create restaurant doc
      await fb.restaurantsCollection.doc(restaurantId).set({
        name: this.restaurant,
        menus: [menuId]
      });

      // create menu doc
      await fb.menusCollection.doc(menuId).set({
        restaurant: restaurantId,
        items: []
      });

      this.$store.dispatch("fetchUserProfile");
      this.$router.push("/dashboard");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/config.scss";
.signup {
  text-align: left;
  article {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10%;
  }
  .leftContainer p {
    margin-bottom: 40px;
  }
  ul {
    margin-bottom: 60px;
  }
  .step {
    padding: 0 20px;
    margin-bottom: 14px;
    &::before {
      content: "";
      display: block;
      background-color: var(--neu-05);
      height: 1px;
      width: 100%;
      position: absolute;
      right: 0;
      left: 0;
      top: 24px;
    }
    figure {
      width: 30px;
      position: absolute;
      right: 20px;
      bottom: -30px;
    }
  }
  form {
    display: grid;
    column-gap: 20px;
    row-gap: 40px;
    grid-template-areas:
      "name name ."
      "email password ."
      "restaurant restaurant button"
      ". . error";
    align-items: center;
  }
  .inputContainer {
    &:nth-of-type(1) {
      grid-area: name;
    }
    &:nth-of-type(2) {
      grid-area: email;
    }
    &:nth-of-type(3) {
      grid-area: password;
    }
    &:nth-of-type(4) {
      grid-area: restaurant;
    }
  }
  .button {
    grid-area: button;
  }
  .error {
    grid-area: error;
  }
  @include phablet {
    article {
      grid-template-columns: 1fr;
      row-gap: 40px;
    }
    .step {
      &:before {
        width: 100vw;
        left: 50%;
        transform: translateX(-50%);
        top: 20px;
      }
    }
    form {
      padding: 40px 0;
      grid-template-areas: "name" "email" "password" "restaurant" "button" "error";
    }
    figure {
      width: 24px;
    }
    .leftContainer {
      padding-top: 40px;
      p {
        margin-bottom: 20px;
      }
    }
    .rightContainer {
      padding-bottom: 40px;
    }
  }
}
</style>