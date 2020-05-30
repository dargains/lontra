<template>
  <section class="login">
    <div class="wrapper">
      <!-- NEW ADM -->
      <form @submit.prevent v-if="restaurant">
        <h2 class="fontL">Criar novo registo</h2>
        <div class="inputContainer">
          <p class="fontM bold m-01">Nome:</p>
          <input v-model.trim="newAdmForm.name" type="text" placeholder="nome" />
          <span class="error" v-if="newAdmForm.nameError">Falta o nome</span>
        </div>

        <div class="inputContainer">
          <p class="fontM bold m-01">Email:</p>
          <input v-model.trim="newAdmForm.email" type="email" placeholder="email" />
          <span class="error" v-if="newAdmForm.emailError">Falta o email</span>
        </div>

        <div class="inputContainer">
          <p class="fontM bold m-01">Password:</p>
          <input v-model.trim="newAdmForm.password" type="password" placeholder="min 6 caracteres" />
          <span class="error" v-if="newAdmForm.passwordError">Falta a password</span>
        </div>

        <p class="error" v-if="newAdmForm.errorMessage">{{ newAdmForm.errorMessage }}</p>
        <Button :handleClick="checkAdmForm" text="criar" color="m-01" type="button" />
      </form>

      <!-- LOGIN -->
      <form @submit.prevent v-else-if="screen === 'login'">
        <h2 class="fontL">Login</h2>
        <div class="inputContainer">
          <p class="fontM bold m-01">Email:</p>
          <input v-model.trim="loginForm.email" type="email" placeholder="email" />
          <span class="error" v-if="loginForm.emailError">Falta o email</span>
        </div>

        <div class="inputContainer">
          <p class="fontM bold m-01">Password:</p>
          <input v-model.trim="loginForm.password" type="password" placeholder="min 6 caracteres" />
          <span class="error" v-if="loginForm.passwordError">Falta a password</span>
        </div>

        <p class="error" v-if="loginForm.errorMessage">{{ loginForm.errorMessage }}</p>
        <Button text="login" color="m-01" type="button" :handleClick="checkLoginForm" />

        <Button text="sign up" color="neu-05" type="link" link="signup" />
        <button
          class="fontXXS bold recoverButton"
          @click="(screen = 'recover') && (passwordResetSuccess = false)"
        >Recuperar a password</button>
      </form>

      <!-- RECOVER PASSWORD -->
      <form @submit.prevent v-else>
        <h2 class="fontL">Recuperar a password</h2>
        <div v-if="!passwordResetSuccess">
          <div class="inputContainer">
            <p class="fontM bold m-01">Email:</p>
            <input v-model.trim="recoverForm.email" type="text" placeholder="you@email.com" />
            <span class="error" v-if="recoverForm.emailError">Falta a password</span>
          </div>
          <p class="error" v-if="recoverForm.errorMessage">{{ recoverForm.errorMessage }}</p>
          <Button color="m-01" type="button" :handleClick="checkRecoverForm" text="recuperar" />
        </div>
        <p class="fontM" v-else>password reset sent to your email</p>

        <Button
          type="button"
          color="neu-05"
          text="voltar ao login"
          :handleClick="() => screen = 'login'"
        />
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
      loginForm: {
        email: "",
        password: "",
        emailError: false,
        passwordError: false,
        errorMessage: ""
      },
      newAdmForm: {
        name: "",
        nameError: false,
        email: "",
        emailError: false,
        password: "",
        passwordError: false,
        errorMessage: ""
      },
      recoverForm: {
        email: "",
        emailError: false,
        errorMessage: ""
      },
      screen: "login",
      passwordResetSuccess: false
    };
  },
  methods: {
    checkLoginForm() {
      this.loginForm.emailError = this.loginForm.email === "";
      this.loginForm.passwordError = this.loginForm.password === "";
      if (this.loginForm.emailError || this.loginForm.passwordError) return;
      this.login();
    },
    login() {
      this.loginForm.errorMessage = "";
      this.$store.commit("toggleLoading", true);
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(({ user }) => {
          this.$store.commit("setCurrentUser", user);
          this.$store.dispatch("fetchUserProfile");
          this.$router.push("/dashboard");
          this.$store.commit("toggleLoading", false);
        })
        .catch(err => {
          // console.log(err);
          this.loginForm.errorMessage = err.message;
          this.$store.commit("toggleLoading", false);
        });
    },
    checkAdmForm() {
      this.newAdmForm.nameError = this.newAdmForm.name === "";
      this.newAdmForm.emailError = this.newAdmForm.email === "";
      this.newAdmForm.passwordError = this.newAdmForm.password === "";
      if (
        this.newAdmForm.nameError ||
        this.newAdmForm.emailError ||
        this.newAdmForm.passwordError
      )
        return;
      this.signUpAdm();
    },
    signUpAdm() {
      this.newAdmForm.errorMessage = "";
      fb.auth
        .createUserWithEmailAndPassword(
          this.newAdmForm.email,
          this.newAdmForm.password
        )
        .then(({ user }) => {
          fb.usersCollection
            .doc(user.uid)
            .set({
              name: this.newAdmForm.name,
              email: this.newAdmForm.email,
              restaurant: this.restaurant
            })
            .then(() => {
              this.$store.dispatch("fetchUserProfile");
              this.$router.push("/dashboard");
            })
            .catch(err => {
              // console.log(err);
              this.newAdmForm.errorMessage = err.message;
            });
        });
    },
    checkRecoverForm() {
      this.recoverForm.emailError = this.recoverForm.email === "";
      if (this.recoverForm.emailError) return;
      this.recoverPassword();
    },
    recoverPassword() {
      // this.performingRequest = true
      this.recoverForm.errorMessage = "";

      fb.auth
        .sendPasswordResetEmail(this.recoverForm.email)
        .then(() => {
          // this.performingRequest = false
          this.passwordResetSuccess = true;
          this.recoverForm.email = "";
        })
        .catch(err => {
          // console.log(err);
          // this.performingRequest = false
          this.recoverForm.errorMessage = err.message;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/config.scss";
.login {
  .wrapper {
    max-width: 500px;
  }
  .fontL {
    margin-bottom: 80px;
  }
  .button {
    margin: 40px auto;
  }
  .inputContainer {
    text-align: left;
    margin-bottom: 40px;
  }
  .recoverButton {
    margin: 0 auto;
    text-align: center;
    cursor: pointer;
  }
  @include phablet {
    .fontL {
      margin-bottom: 40px;
    }
    .button {
      margin: 20px auto;
    }
  }
}
</style>
