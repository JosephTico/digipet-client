<template>
  <div>
    <h2 class="title mb-4">
      Registro <span v-if="isClient">(cliente)</span
      ><span v-else>(estudiante cuidador)</span>
    </h2>
    <p v-if="isClient" class="lead">
      Por favor complete los siguientes datos para registrarse como cliente en
      DigiPet
    </p>
    <p v-else class="lead">
      Por favor complete los siguientes datos para registrarse como estudiante
      cuidador en DigiPet.
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
              placeholder="Inserte su nombre"
              maxlength="30"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Apellidos:">
            <b-form-input
              v-model="form.lastName"
              placeholder="Inserte su apellido"
              maxlength="30"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group label="Email:">
            <b-form-input
              v-model="form.email1"
              placeholder="Inserte su email"
              type="email"
              maxlength="30"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Email adicional (opcional):">
            <b-form-input
              v-model="form.email2"
              placeholder="Inserte un email adicional"
              type="email"
              maxlength="30"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group label="Teléfono móvil:">
            <b-form-input
              v-model="form.phone"
              placeholder="Inserte su número de teléfono"
              required
              type="tel"
              pattern="[0-9]{8}"
              maxlength="8"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Foto de perfil:">
            <b-form-file
              v-model="fileStorage"
              placeholder="Elija una imagen..."
              drop-placeholder="Arrastre la imagen acá..."
              accept="image/jpeg, image/png, image/gif"
              browse-text="Explorar"
              required
            ></b-form-file>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group label="Contraseña:">
            <VuePassword
              id="password1"
              v-model="form.password"
              disable-strength
              type="password"
              required
              classes="form-control"
              maxlength="100"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Descripción personal:">
            <b-form-input
              v-model="form.personalDescription"
              placeholder="Inserte una descripción para su perfil"
              required
              maxlength="250"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group label="Provincia:">
            <b-form-select
              v-model="form.idProvince"
              :options="provinces"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Cantón:">
            <b-form-select
              v-model="form.idCanton"
              :options="cantones"
              :disabled="cantones.length == 0"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row v-if="!isClient">
        <b-col>
          <b-form-group label="Universidad:">
            <b-form-select
              v-model="form.idUniversity"
              :options="universities"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Carnet:">
            <b-form-input
              v-model="form.idStudent"
              required
              placeholder="Inserte su carnet acá"
              maxlength="10"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row v-if="!isClient">
        <b-col>
          <b-form-group label="Provincias adicionales:">
            <b-form-checkbox v-model="form.worksInOtherProvince">
              Quiero que se me asignen trabajos en otras provincias
            </b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            v-if="form.worksInOtherProvince"
            label="Seleccione las provincias adicionales:"
          >
            <Multiselect
              v-model="additionalProvinces"
              label="text"
              track-by="value"
              :multiple="true"
              required
              :options="multiselectProvinces"
            >
            </Multiselect>
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
        >Enviar</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { VuePassword } from "vue-password";
import cantonesJson from "../assets/cantones.json";
import provinciasJson from "../assets/provincias.json";
import Multiselect from "vue-multiselect";

export default {
  components: {
    VuePassword,
    Multiselect
  },
  middleware: ["non-auth"],
  data() {
    return {
      form: {
        photo: "",
        name: "Tester",
        lastName: "Tester2",
        password: "test",
        personalDescription: "Test",
        idProvince: 1,
        idCanton: 1,
        email1: "test@test.com",
        phone: "88888888"
      },
      fileStorage: null,
      additionalProvinces: [],
      errorString: "",
      loading: false,
      universities: [
        { value: 1, text: "Tecnológico de Costa Rica" },
        { value: 2, text: "Universidad de Costa Rica" },
        { value: 3, text: "Universidad Nacional" },
        { value: 4, text: "UNED" },
        { value: 5, text: "UTN" }
      ]
    };
  },

  computed: {
    type() {
      if (this.$route.query.type == "student") return "student";
      return "client";
    },
    isClient() {
      if (this.$route.query.type == "student") return false;
      return true;
    },
    provinces() {
      return provinciasJson.map(item => {
        return { value: item.IdProvince, text: item.Name };
      });
    },
    multiselectProvinces() {
      return this.provinces.filter(item => {
        return item.value != this.form.idProvince;
      });
    },
    cantones() {
      return cantonesJson
        .map(item => {
          return { value: item.IdCanton, text: item.Name };
        })
        .filter(item => {
          return (
            cantonesJson[item.value - 1].IdProvince == this.form.idProvince
          );
        });
    }
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
    prepareAdditionalProvinces() {
      this.form.otherProvincesId = this.additionalProvinces.map(item => {
        return item.value;
      });
    },
    sendData() {
      let url;
      if (this.isClient) {
        url = "/signup/clients";
      } else {
        url = "/signup/students";
      }

      this.$axios
        .$post(url, this.form)
        .then(response => {
          this.$cookies.set("user", response.token, "4h");
          this.$cookies.set("user.type", response.type, "4h");
          this.$cookies.set("user.id", response.id, "4h");
          this.$nuxt.$loading.finish();
          location.href = "/signupconfirm";
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

      this.getBase64(this.fileStorage).then(
        data => {
          this.form.photo = data;
          console.log(data);
          if (this.type == "student") this.prepareAdditionalProvinces();
          this.sendData();
        },
        () => {
          this.form.errorString = "La foto es inválida. Por favor elija otra.";
          this.form.photo = "";
          this.fileStorage = null;
          this.loading = false;
          this.$nuxt.$loading.fail();
        }
      );
    }
  }
};
</script>

<style></style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
