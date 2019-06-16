<template>
 <div center-block>
 
  <b-card
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 40rem;"
    class="mx-auto"
  >
  <h1>Datos del Servicio </h1>
  <b-row class="ml-1 mr-2"><h3>Costo del Servicio: </h3><h3 align="end"> $50.0 </h3></b-row>
  
  <b-row class="ml-1"><h3>Mascota: </h3><h3>{Nombre del bichillo} </h3></b-row>
  <b-row class="ml-1"><h3>Lugar de recogida: </h3><h3>{Lugar} </h3></b-row>
  <b-row class="ml-1"><h3>Hora de recogida: </h3><h3>{Hora} </h3></b-row>
  <b-row class="ml-1"><h3>Descripción: </h3></b-row>
    <b-card-text>
      {descripción de la vara de la vara jaja}
    </b-card-text>

      <b-button variant="primary" href="#">Cancelar</b-button>
    <b-button variant="success" href="#">Confirmar y hacer pago</b-button>

  </b-card>


  
</div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {}
};
</script>

<style></style>