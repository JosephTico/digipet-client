<template>
  <div>
    <h2 class="title mb-4">Reportes financieros</h2>

    <b-row>
      <b-col>
        <b-form-group label="Fecha inicio:">
          <datetime
            v-model="form.starDate"
            input-class="form-control"
            required
            value-zone="local"
            zone="local"
          ></datetime>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Fecha final:">
          <datetime
            v-model="form.endDate"
            input-class="form-control"
            required
            value-zone="local"
            zone="local"
          ></datetime>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button to="/mainscreen" variant="outline-primary" style="width:100%"
          >Cancelar</b-button
        >
      </b-col>
      <b-col>
        <b-button variant="primary" style="width:100%"
          >Generar reporte</b-button
        >
      </b-col>
    </b-row>
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
      form: {},
      fileStorage: null,
      errorString: "",
      loading: false
    };
  }
};
</script>

<style></style>
