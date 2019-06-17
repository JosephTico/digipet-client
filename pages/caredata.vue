<template>
  <b-container>
    <b-row>
      <b-col cols="9">
        <b-row>
          <CareCard
            carename="Joseph"
            careimg="https://via.placeholder.com/150"
            petname="Mascotín"
            petimg="https://via.placeholder.com/150"
            date="Hoy"
            hour="03:05 PM"
          ></CareCard>
        </b-row>
      </b-col>
      <b-col cols="3">
        <b-button to="/mainscreen" variant="primary">Atrás</b-button>
      </b-col>
    </b-row>
    <b-row>
      <h2 class="title mb-3 mt-3 ">
        Detalles de cuidado:
      </h2>
    </b-row>

    <div>
      <b-card-text>
        Some quick example text to build on the <em>card title</em> and make up
        the bulk of the card's content.
      </b-card-text>

      <b-card-text>A second paragraph of text in the card.</b-card-text>
    </div>
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
