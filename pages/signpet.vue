<template>
  <div>
    <h2 class="title mb-4">Registro de Mascotas</h2>
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
              v-model="form.name"
              placeholder="Inserte el nombre de su mascota"
              required
              maxlength="30"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Edad:">
            <b-form-input
              v-model="form.age"
              placeholder="Inserte la edad de su mascota"
              required
              type="number"
              pattern="[0-9]{2}"
              maxlength="2"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Tamaño de su mascota:">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="form.size"
              class="mb-2 mr-sm-2 mb-sm-0"
              required
              :value="null"
              :options="{ S: 'S', M: 'M', L: 'L', XL: 'XL' }"
            >
              <option slot="first" :value="null">Escoja una opción...</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Foto de su mascota:">
            <b-form-file
              v-model="fileStorage"
              placeholder="Elija una o varias imágenes..."
              drop-placeholder="Arrastre la imagen acá..."
              accept="image/jpeg, image/png, image/gif"
              browse-text="Explorar"
              required
              multiple
              :file-name-formatter="formatNames"
            ></b-form-file>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Descripción:">
            <b-form-textarea
              id="textarea"
              v-model="form.petDescription"
              placeholder="Inserte una descripción de su mascota"
              required
              rows="3"
              max-rows="6"
              maxlength="300"
            >
            </b-form-textarea>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-button type="submit" variant="primary">Ingresar mascota</b-button>
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
    },
    formatNames(files) {
      if (files.length === 1) {
        return files[0].name;
      } else {
        return `${files.length} fotos seleccionadas`;
      }
    }
  }
};
</script>

<style></style>
