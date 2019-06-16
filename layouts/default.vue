<template>
  <div>
    <b-navbar toggleable="lg" class="mb-3">
      <b-navbar-brand to="/" no-prefetch>
        <img
          src="https://i.ibb.co/XVyy060/Screenshot-20190527192506-651x427.png"
          class="d-inline-block align-top"
          alt="Kitten"
          width="30"
          height="30"
        />
        DigiPet
      </b-navbar-brand>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-button v-if="checkLoggedIn()" variant="primary" @click="logout"
          >Cerrar sesión</b-button
        >
        <b-button v-else v-b-modal.login-modal variant="primary"
          >Iniciar sesión</b-button
        >
      </b-navbar-nav>
    </b-navbar>

    <b-modal
      id="login-modal"
      ref="login-modal"
      title="Iniciar sesión"
      centered
      ok-title="Ingresar"
      cancel-title="Cancelar"
      hide-footer
    >
      <b-alert v-show="errorString" show variant="danger">
        {{ errorString }}
      </b-alert>

      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Email o usuario:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.user"
            type="text"
            required
            placeholder="Ingrese un valor"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Contraseña:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            placeholder="Ingrese su contraseña"
          ></b-form-input>
        </b-form-group>
        <b-button
          v-if="loading"
          type="submit"
          variant="primary"
          style="width:100%"
          disabled
        >
          <b-spinner small label="Small Spinner"></b-spinner>
        </b-button>
        <b-button v-else type="submit" variant="primary" style="width:100%"
          >Ingresar</b-button
        >
      </b-form>
    </b-modal>

    <b-container>
      <nuxt />
    </b-container>
    <!-- Footer -->
    <footer class="page-footer font-small blue">
      <!-- Copyright -->
      <div class="footer-copyright text-center py-3">
        © {{ new Date().getFullYear() }} Copyright:
        <a href="https://github.com/JosephTico/digipet-client"> X-TEC</a>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: "",
        password: ""
      },
      loading: false,
      errorString: ""
    };
  },
  methods: {
    logout() {
      this.$cookies.remove("user");
      this.$cookies.remove("user.type");
      this.$cookies.remove("user.id");

      this.$router.push({
        path: "/?loggedOut=1"
      });
      this.$forceUpdate();
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.loading = true;
      this.$nuxt.$loading.start();
      this.errorString = "";

      this.$axios
        .$post(
          "/login",
          "user=" + this.form.user.trim() + "&password=" + this.form.password,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(response => {
          if (response.token) {
            this.$cookies.set("user", response.token, "4h");
            this.$cookies.set("user.type", response.type, "4h");
            this.$cookies.set("user.id", response.id, "4h");
            this.$refs["login-modal"].hide();
            this.$router.push({
              path: "/mainscreen"
            });
          } else {
            this.errorString =
              "Ha ocurrido un error desconocido. Por favor inténtelo de nuevo";
          }
          this.loading = false;
          this.$nuxt.$loading.finish();
        })
        .catch(error => {
          this.errorString = this.errorParser(error);
          this.loading = false;
          this.$nuxt.$loading.fail();
        });
    }
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.navbar {
  border-bottom: 1px solid whitesmoke;
}
</style>
