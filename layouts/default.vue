<template>
  <div>
    <b-navbar toggleable="lg" class="mb-3">
      <b-navbar-brand href="#">
        <img
          src="https://placekitten.com/g/30/30"
          class="d-inline-block align-top"
          alt="Kitten"
        />
        Digipet
      </b-navbar-brand>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-button v-b-modal.login-modal variant="primary"
          >Iniciar sesión</b-button
        >
      </b-navbar-nav>
    </b-navbar>

    <b-modal
      id="login-modal"
      title="Iniciar sesión"
      centered
      ok-title="Ingresar"
      cancel-title="Cancelar"
      hide-footer
    >
      <b-alert v-show="errorString" show variant="danger">
        {{ errorString }}
      </b-alert>

      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Email o usuario:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.username"
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
import _ from "lodash";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      loading: false,
      errorString: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.loading = true;
      this.errorString = "";

      this.$axios
        .$post("https://reqres.in/api/login/", this.form)
        .then(response => {
          console.log(response);

          this.loading = false;
        })
        .catch(error => {
          if (_.has(error.response, "data")) {
            this.loading = false;
            this.errorString = error.response.data.error;
            console.log(this.$cookies.get("Holamundo"));
            console.log(this.checkLoggedIn());
          }
          this.loading = false;
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
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

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.navbar {
  border-bottom: 1px solid whitesmoke;
}
</style>
