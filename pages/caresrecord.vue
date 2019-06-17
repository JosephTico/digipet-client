<template>
  <div>
    <b-row align-h="between">
      <b-col cols="10"><h2 class="title mb-4">Cuidados Anteriores</h2></b-col>
      <b-col
        ><b-button href="/mainscreen" variant="primary">Atrás</b-button>
      </b-col>

      <b-row class="border rounded mb-2" style="background-color: #E8E9E8">
        <CareCard
          carename="Joseph"
          careimg="https://via.placeholder.com/150"
          petname="Mascotín"
          petimg="https://via.placeholder.com/150"
          date="Hoy"
          hour="03:05 PM"
        ></CareCard>
      </b-row>
    </b-row>
  </div>
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

<style></style>
