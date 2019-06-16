<template>
  <div>
    <h2 class="title mb-4">Pedir caminata</h2>
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
          <b-form-group label="Hora inicio:">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="form.Size"
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
              <option slot="first" :value="null">Escoja una Hora de inicio...</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Hora final:">
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
      </b-form-row>
      <b-form-row> </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Descripción:">
            <b-form-textarea
              id="textarea"
              v-model="form.PetDescription"
              placeholder="Inserte una descripción de su mascota"
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
export default {
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
