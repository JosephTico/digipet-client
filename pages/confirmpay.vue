<template>
  <div center-block>
    <b-card
      img-src="https://img.cutenesscdn.com/640/cme/cuteness_data/s3fs-public/diy_blog/The-Importance-of-Walking-Dogs.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 40rem;"
      class="mx-auto"
    >
      <h1 slot="header">Datos del Servicio</h1>
      <b-row align-h="between" class="ml-1 mr-1"
        ><h3 class="mr-2">Costo del Servicio:</h3>
        <h3>$50.0</h3></b-row
      >
      <b-row align-h="between" class="ml-1 mr-1"
        ><h3 class="mr-2">Mascota:</h3>
        <h3>{Nombre del bichillo}</h3></b-row
      >
      <b-row align-h="between" class="ml-1 mr-1"
        ><h3 class="mr-2">Lugar de recogida:</h3>
        <h3>{Lugar}</h3></b-row
      >
      <b-row align-h="between" class="ml-1 mr-1"
        ><h3 class="mr-2">Hora de recogida:</h3>
        <h3>{Hora}</h3></b-row
      >
      <b-row align-h="between" class="ml-1 mr-1"
        ><h3 class="mr-2">Descripción:</h3></b-row
      >
      <b-card-text class="ml-1 mr-1">
        {descripción de la vara de la vara jaja}
      </b-card-text>

      <b-button variant="primary" to="/carerequest">Cancelar</b-button>
      <b-button variant="success" to="#">Confirmar y hacer pago</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  middleware: "auth",

  data() {
    return {};
  },

  methods: {}
};
</script>

<style></style>
