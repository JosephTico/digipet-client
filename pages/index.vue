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

    <h3 class="mb-3">Cuidado para sus mascotas, a su alcance</h3>

    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          Nunca más se preocupe por dejar sus mascotas solas, con DigiPet, usted
          puede pedir que una persona de confianza pasee a sus mascotas.
        </b-col>
        <b-col><img src="~/assets/img/doggo.png" alt="Dog"/></b-col>
        <b-col>
          Además contamos con servicio de hotelería para sus mascotas.
        </b-col>
        <b-col><img src="~/assets/img/hotel.png" alt="Dog"/></b-col>
      </b-row>
    </b-container>

    <hr class="my-4" />

    <h3 class="mb-3">Regístrese ahora</h3>

    <p class="lead">
      Regístrese con <b>DigiPet</b> y empiece a disfrutar de nuestros
      beneficios.
    </p>

    <b-container>
      <b-row>
        <b-col>
          <b-card no-body class="overflow-hidden" style="max-width: 540px;">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  src="~/assets/img/owner.jpeg"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body title="Clientes">
                  <b-card-text>
                    ¿Sin tiempo y con mascotas? Aproveche los servicios de
                    DigiPet y nosotros nos encargaremos de cuidarla de la mejor
                    manera posible.
                  </b-card-text>
                  <b-button href="#" variant="primary">Registrarse</b-button>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col>
          <b-card no-body class="overflow-hidden" style="max-width: 540px;">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img
                  src="~/assets/img/student.jpeg"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body title="Estudiantes">
                  <b-card-text>
                    ¿Ama los animales y quiere generar ingresos extra en su
                    tiempo libre? Cuide mascotas en su tiempo libre y gane
                    dinero mientras lo hace.
                  </b-card-text>
                  <b-button href="#" variant="primary">Registrarse</b-button>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
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
.navbar {
  border-bottom: 1px solid whitesmoke;
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
