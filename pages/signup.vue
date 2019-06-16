<template>
  <div>
    <h2 class="title mb-4">Registro (cliente)</h2>
    <p class="lead">
      Por favor complete los siguientes datos para registrarse como cliente en
      DigiPet
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
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Apellidos:">
            <b-form-input
              v-model="form.lastName"
              placeholder="Inserte su apellido"
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
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Descripción personal:">
            <b-form-input
              v-model="form.personalDescription"
              placeholder="Inserte una descripción para su perfil"
              required
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
          <b-form-group label="Cantones:">
            <b-form-select
              v-model="form.idCanton"
              :options="cantones"
              required
            ></b-form-select>
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

export default {
  components: {
    VuePassword
  },
  data() {
    return {
      form: {
        photo: ""
      },
      fileStorage: null,
      errorString: "",
      loading: false
    };
  },

  computed: {
    provinces() {
      return provinciasJson.map(item => {
        return { value: item.IdProvince, text: item.Name };
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
          if (encoded.length % 4 > 0) {
            encoded += "=".repeat(4 - (encoded.length % 4));
          }
          resolve(encoded);
        };
        reader.onerror = error => reject(error);
      });
    },
    sendData() {
      this.$axios
        .$post("/signup/clients", this.form)
        .then(response => {
          alert(response);
        })
        .catch(error => {
          this.errorString = this.errorParser(error);
          this.loading = false;
          this.$nuxt.$loading.fail();
        });
      this.loading = false;
      this.$nuxt.$loading.finish();
    },
    onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      this.$nuxt.$loading.start();
      this.errorString = "";

      this.getBase64(this.fileStorage).then(
        data => {
          this.form.photo = data;
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
