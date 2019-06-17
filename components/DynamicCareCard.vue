<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col cols="4">
        <b-card-img :src="petimg" class="rounded-0"></b-card-img>
      </b-col>
      <b-col cols="5">
        <b-card-body :title="petname">
          <b-card-text>
            <p><fa icon="calendar"></fa> {{ datetime | moment("LL") }}</p>
            <p><fa icon="clock"></fa> {{ datetime | moment("h:mm a") }}</p>
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col cols="3">
        <b-card-body>
          <b-card-text class="mx-auto text-center">
            <b-card-img
              :src="careimg"
              class="rounded-circle mx-auto d-block"
            ></b-card-img>
            <p><fa icon="user"></fa> {{ carename }}</p>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: {
    datetime: { type: String, required: true },
    pet: { type: Number, required: true },
    caregiver: { type: Number, required: true }
  },
  data() {
    return {
      hour: "",
      data: "",
      petname: "Cargando...",
      petimg:
        "https://cdn.dribbble.com/users/238583/screenshots/3630870/lagif-grande.gif",
      carename: "         ",
      careimg:
        "https://cdn.dribbble.com/users/238583/screenshots/3630870/lagif-grande.gif"
    };
  },
  created() {
    this.$axios.$get("/pets/" + this.pet).then(response => {
      this.petname = response.name;
      this.petimg = response.photoLinks[0]
        ? response.photoLinks[0]
        : "/img/dog.jpg";
    });

    this.$axios.$get("/students/" + this.caregiver).then(response => {
      this.carename = response.name;
      this.careimg = response.photo ? response.photo : "/img/person.jpg";
    });
  }
};
</script>

<style scoped>
.card {
  max-width: 600px;
  height: 150px;
  min-width: 500px;
}

.card img {
  max-height: 150px;
  background: whiteSmoke;
  object-fit: cover;
}

.card img.rounded-circle {
  height: 90px;
  width: 90px;
}
</style>
