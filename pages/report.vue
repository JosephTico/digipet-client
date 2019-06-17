<template>
  <b-container>
    <b-row>
      <b-col>
        <b-row>
          <b-container class=" mr-3">
            

              <CareCard
                carename="Joseph"
                careimg="https://via.placeholder.com/150"
                petname="Mascotín"
                petimg="https://via.placeholder.com/150"
                date="Hoy"
                hour="03:05 PM"
              ></CareCard>


          </b-container>
        </b-row>
      </b-col>
      <b-col>
        <b-button href="/mainscreen" variant="primary">Atrás</b-button>
      </b-col>
    </b-row>
    <b-row>
      <h2 class="title mb-3 mt-3 ">
        Tarjeta de reporte:
      </h2>
    </b-row>
    <b-form @submit="onSubmit">
      <b-form-textarea
        id="textarea"
        v-model="form.ReportDescription"
        placeholder="Escriba aquí su reporte "
        required
        rows="6"
        max-rows="12"
      >
      </b-form-textarea>
      <b-button type="submit" class="mt-3" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import CareCard from "~/components/CareCard.vue";

export default {
  middleware: "auth",
  components: { CareCard },
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

<style>
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
