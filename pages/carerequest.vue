<template>
  <div>
    <h2 class="title mb-4">Pedir caminata</h2>
    <p class="lead">
      Por favor complete los siguientes datos para registrar su mascota
    </p>

    <b-alert v-show="errorString" show variant="danger">
      {{ errorString }}
    </b-alert>

    <b-form @submit="onSubmit">
      <b-form-row>
        <b-col>
          <b-form-group label="Nombre:">
            <b-form-input
              v-model="form.Name"
              placeholder="Inserte el nombre de su mascota"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Edad:">
            <b-form-input
              v-model="form.Age"
              placeholder="Inserte la edad de su mascota"
              required
              type="number"
              pattern="[0-9]{2}"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Tamaño de mi mascota:">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="form.Size"
              class="mb-2 mr-sm-2 mb-sm-0"
              required
              :value="null"
              :options="{ '1': 'S', '2': 'M', '3': 'L', '4': 'XL' }"
            >
              <option slot="first" :value="null">Escoja una opción...</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
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
