<template>
  <div center-block>
    <h2 class="ml-1 ">Horarios de disponibilidad</h2>
    <p class="lead">
      En esta sección puede configurar su disponibilidad para trabajar
      dependiendo de la fecha.
    </p>
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
    <b-button v-b-toggle="'collapse-2'" variant="success" class="m-1 mt-2 "
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
          <b-button class="mt-2 ml-2" variant="primary" href="#"
            >Confirmar nuevo horario</b-button
          >
        </b-row>
      </b-card>
    </b-collapse>
    <div class="mt-2 ml-2">
      <b-button variant="outline-secondary" to="/mainscreen"
        >Volver atrás</b-button
      >
    </div>
  </div>
</template>

<script>
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

export default {
  middleware: "auth",

  components: {
    datetime: Datetime
  },
  data() {
    return {
      schedule: [],
      currentDate: ""
    };
  },

  methods: {
    refreshSchedule() {
      let date = new Date(this.currentDate);
      date = date
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      this.$axios
        .$get(
          "/students/" + this.$cookies.get("user.id") + "/schedule?date=" + date
        )
        .then(response => {
          this.schedule = response.data;
        });
    }
  }
};
</script>

<style></style>
