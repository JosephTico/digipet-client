<b-alert>
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
              v-model="form.Name"
              placeholder="Inserte su nombre"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Apellidos:">
            <b-form-input
              v-model="form.LastName"
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
              v-model="form.Email1"
              placeholder="Inserte su email"
              type="email"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Email adicional (opcional):">
            <b-form-input
              v-model="form.Email2"
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
              v-model="form.Phone"
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
              v-model="form.Password"
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
              v-model="form.PersonalDescription"
              placeholder="Inserte una descripción para su perfil"
              required
            ></b-form-input>
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
</b-alert>

<script>
import { VuePassword } from "vue-password";

export default {
  components: {
    VuePassword
  },
  data() {
    return {
      form: {
        file: ""
      },
      fileStorage: null,
      errorString: "",
      loading: false
    };
  },

  methods: {
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let encoded = reader.result.replace(/^data:(.*;base64,)?/, "");
          if (encoded.length % 4 > 0) {
            encoded += "=".repeat(4 - (encoded.length % 4));
          }
          resolve(encoded);
        };
        reader.onerror = error => reject(error);
      });
    },
    onSubmit(event) {
      this.loading = true;
      this.$nuxt.$loading.start();
      event.preventDefault();
      this.getBase64(this.fileStorage).then(
        data => {
          alert(data);
          this.loading = false;
          this.$nuxt.$loading.finish();
        },
        () => {
          this.form.errorString = "La foto es inválida. Por favor elija otra.";
          this.loading = false;
          this.$nuxt.$loading.fail();
        }
      );
    }
  }
};
</script>

<style></style>
