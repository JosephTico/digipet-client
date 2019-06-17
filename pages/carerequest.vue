<template>
  <div>
    <b-row align-h="between">
      <b-col cols="10"><h2 class="title mb-4">Pedir caminata</h2></b-col>
      <b-col
        ><b-button href="/mainscreen" variant="primary">Atrás</b-button></b-col
      >
    </b-row>

    <p class="lead">
      Por favor complete los siguientes datos solicitar el servicio
    </p>

    <b-alert v-show="errorString" show variant="danger">
      {{ errorString }}
    </b-alert>

    <b-form @submit="onSubmit">
      <b-form-row>
        <b-col>
          <b-form-group label="Escoger:">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="form.Size"
              class="mb-2 mr-sm-2 mb-sm-0"
              required
              :value="null"
              :options="{ '1': 'yose', '2': 'nasho' }"
            >
              <option slot="first" :value="null">Escoja una mascota...</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Escoger fecha:">
            <b-col><datetime v-model="form.Date"></datetime></b-col>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Hora inicio:">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="form.StartHour"
              class="mb-2 mr-sm-2 mb-sm-0"
              required
              :value="null"
              :options="{
                '1': '0',
                '2': '1',
                '3': '2',
                '4': '3',
                '5': '4',
                '6': '5',
                '7': '6',
                '8': '7',
                '9': '8',
                '10': '9',
                '11': '10',
                '12': '11',
                '13': '12',
                '14': '13',
                '15': '14',
                '16': '15',
                '17': '16',
                '18': '17',
                '19': '18',
                '20': '19',
                '21': '20',
                '22': '21',
                '23': '22',
                '24': '23'
              }"
            >
              <option slot="first" :value="null"
                >Escoja una Hora de inicio...</option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="0">
          <h2 class="mt-4">:</h2>
        </b-col>
        <b-col>
          <b-form-group class="" label=" ">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="form.StartMinutes"
              class="mb-2 mr-sm-2 mb-sm-0 mt-4"
              required
              :value="null"
              :options="{ '1': '00', '2': '30' }"
            >
              <option slot="first" :value="null">Escoja una opción...</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Hora final:">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="form.EndHour"
              class="mb-2 mr-sm-2 mb-sm-0"
              required
              :value="null"
              :options="{
                '1': '0',
                '2': '1',
                '3': '2',
                '4': '3',
                '5': '4',
                '6': '5',
                '7': '6',
                '8': '7',
                '9': '8',
                '10': '9',
                '11': '10',
                '12': '11',
                '13': '12',
                '14': '13',
                '15': '14',
                '16': '15',
                '17': '16',
                '18': '17',
                '19': '18',
                '20': '19',
                '21': '20',
                '22': '21',
                '23': '22',
                '24': '23'
              }"
            >
              <option slot="first" :value="null"
                >Escoja una Hora final...</option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="0">
          <h2 class="mt-4">:</h2>
        </b-col>
        <b-col>
          <b-form-group class="" label=" ">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="form.EndMinutes"
              class="mb-2 mr-sm-2 mb-sm-0 mt-4"
              required
              :value="null"
              :options="{ '1': '00', '2': '30' }"
            >
              <option slot="first" :value="null">Escoja una opción...</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Lugar de recogida:">
            <b-form-textarea
              id="textarea"
              v-model="form.PickUpLocation"
              placeholder="Inserte el lugar de recogida"
              required
              rows="2"
              max-rows="3"
            >
            </b-form-textarea>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Descripción:">
            <b-form-textarea
              id="textarea"
              v-model="form.OwnerComments"
              placeholder="Inserte comentarios para el cuido de su mascota"
              required
              rows="3"
              max-rows="6"
            >
            </b-form-textarea>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
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
    return {
      form: {
        file: ""
      },
      fileStorage: null,
      errorString: ""
    };
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
};
</script>

<style></style>
