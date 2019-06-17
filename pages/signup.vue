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
        photo: ""
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
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let encoded = reader.result;
          resolve(encoded);
        };
        reader.onerror = error => reject(error);
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
          window.location("/signupconfirm");
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
