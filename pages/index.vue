<template>
  <div>
    <b-alert v-if="this.$route.query.loggedOut" show variant="info"
      >Se ha cerrado la sesión satisfactoriamente.</b-alert
    >
    <b-alert v-if="this.$route.query.forcedLogOut" show variant="warning"
      >Se ha cerrado la sesión debido a un error. Por favor ingrese
      nuevamente.</b-alert
    >
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
                  <b-button to="/signup" variant="primary"
                    >Registrarse</b-button
                  >
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
                  <b-button to="/signup?type=student" variant="primary"
                    >Registrarse</b-button
                  >
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
export default {
  middleware: ["non-auth"],
  computed: {
    loggedOut: function() {
      return this.$route.query.loggedOut;
    }
  }
};
</script>

<style>
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
