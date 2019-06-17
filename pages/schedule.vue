<template>
  <div center-block>
    <b-row><h2 class="ml-1 ">Horarios de Cuidado</h2></b-row>
    <b-card class="mx-auto">
      <b-row><h4 class="ml-2 ">Escoja la fecha:</h4></b-row>
      <b-row>
        <b-col cols="0"><fa icon="calendar-alt" class=" ml-3 mt-2"></fa></b-col>
        <b-col><datetime v-model="date"></datetime></b-col>
      </b-row>
      <b-row><h4 class="ml-2 mt-2 ">Horarios del dia:</h4></b-row>
      <b-row
        ><h5 class="ml-3 ">
          <fa icon="clock" class="mr-1 mt-2"></fa>
          {12:30}
          <fa icon="arrow-right" class="mr-1 ml-1 mt-2"></fa>
          {14:00}
        </h5></b-row
      >
      <b-button class=" mt-2 " variant="danger" href="#"
        >Borrar horario</b-button
      >
    </b-card>
    <b-button v-b-toggle="'collapse-2'" class="m-1 mt-2 "
      >Agregar nuevo horario</b-button
    >
    <!-- Element to collapse -->
    <b-collapse id="collapse-2" class="">
      <b-card class="mx-auto">
        <b-row align-h="start">
          <b-col cols="2" class=" ml-2 ">
            <b-row><h4>Hora de inicio:</h4></b-row>
            <b-row>
              <datetime
                v-model="startime"
                type="time"
                input-class="my-class"
                :format="{ hour: 'numeric', minute: '2-digit' }"
                :phrases="{ ok: 'Continue', cancel: 'Exit' }"
                :hour-step="1"
                :minute-step="30"
                auto
              ></datetime>
            </b-row>
          </b-col>
          <b-col class=" ml-2 ">
            <b-row class=""><h4>Hora de finalización:</h4></b-row>
            <b-row>
              <datetime
                v-model="startime"
                type="time"
                input-class="my-class"
                :format="{ hour: 'numeric', minute: '2-digit' }"
                :phrases="{ ok: 'Continue', cancel: 'Exit' }"
                :hour-step="1"
                :minute-step="30"
                auto
              ></datetime>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-button class=" mt-2 ml-2" variant="success" href="#"
            >Añadir horario</b-button
          >
        </b-row>
      </b-card>
    </b-collapse>
    <div class="mt-2">
      <b-button variant="primary" href="#">Cancelar</b-button>
      <b-button variant="success" href="#">Confirmar</b-button>
    </div>
  </div>
</template>

<script>
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

export default {
  components: {
    datetime: Datetime
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style></style>
