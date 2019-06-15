<template>
  <div>
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
          <b-button variant="primary">Iniciar sesión</b-button>
        </b-navbar-nav>
      </b-navbar>
    </div>

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
                  src="https://picsum.photos/400/400/?image=20"
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
                    tiempo libre? En DigiPet usted puede cuidar mascotas en su
                    tiempo libre y ganar dinero mientras lo hace.
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
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>

<style>
.navbar {
  border-bottom: 1px solid whitesmoke;
}
</style>
