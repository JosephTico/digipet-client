<template>
  <div center-block>
    <datetime v-model="date"></datetime>

    <div>
      <b-button v-b-toggle="'collapse-2'" class="m-1 mt-2"
        >Toggle Collapse</b-button
      >
      <!-- Element to collapse -->
      <b-collapse id="collapse-2" class="mt-4">
        <b-card>
          <b-col>
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
          <b-col>
            <datetime
              v-model="endtime"
              type="time"
              input-class="my-class"
              :format="{ hour: 'numeric', minute: '2-digit' }"
              :phrases="{ ok: 'Continue', cancel: 'Exit' }"
              :hour-step="1"
              :minute-step="30"
              auto
            ></datetime>
          </b-col>
        </b-card>
      </b-collapse>
    </div>

    <b-button variant="primary" href="#">Cancelar</b-button>
    <b-button variant="success" href="#">Confirmar</b-button>
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
