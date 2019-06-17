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

      <b-button
        v-if="loading"
        type="submit"
        variant="primary"
        style="width:100%"
        disabled
      >
        <b-spinner small label="Small Spinner"></b-spinner>
      </b-button>
      <b-button v-else type="submit" variant="primary" style="width:100%"
        >Ingresar mascota</b-button
      >
    </b-form>
  </div>
</template>

<script>
export default {
  middleware: "auth",

  data() {
    return {
      form: {
        photoLinks: []
      },
      fileStorage: null,
      errorString: "",
      loading: false
    };
  },

  methods: {
    resizeImage(settings) {
      var file = settings.file;
      var maxSize = settings.maxSize;
      var reader = new FileReader();
      var image = new Image();
      var canvas = document.createElement("canvas");

      var resize = function() {
        var width = image.width;
        var height = image.height;
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        return canvas.toDataURL("image/jpeg");
      };
      return new Promise(function(ok, no) {
        if (!file.type.match(/image.*/)) {
          no(new Error("Not an image"));
          return;
        }
        reader.onload = function(readerEvent) {
          image.onload = function() {
            return ok(resize());
          };
          image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
      });
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        this.resizeImage({
          file: file,
          maxSize: 400
        })
          .then(img => resolve(img))
          .catch(error => reject(error));
      });
    },
    sendData() {
      console.log(this.form);
      this.$axios
        .$post("/pets", this.form)
        .then(() => {
          this.loading = false;
          this.$nuxt.$loading.finish();
          this.$router.push({
            path: "/mainscreen",
            query: { action: "newPet" }
          });
        })
        .catch(error => {
          this.errorString = this.errorParser(error);
          this.loading = false;
          this.$nuxt.$loading.fail();
        });
    },
    onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      this.$nuxt.$loading.start();
      this.errorString = "";

      let promises = [];

      for (let photo of this.fileStorage) {
        promises.push(this.getBase64(photo));
      }

      Promise.all(promises)
        .then(values => {
          this.form.photoLinks = values;
          this.sendData();
        })
        .catch(() => {
          this.form.errorString = "La foto es inválida. Por favor elija otra.";
          this.form.photoLinks = "";
          this.fileStorage = null;
          this.loading = false;
          this.$nuxt.$loading.fail();
        });
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
