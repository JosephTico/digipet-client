<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col cols="4">
        <b-card-img :src="petimg" class="rounded-0"></b-card-img>
      </b-col>
      <b-col cols="5">
        <b-card-body :title="petname">
          <b-card-text>
            <p><fa icon="calendar"></fa> {{ date }}</p>
            <p><fa icon="clock"></fa> {{ hour }}</p>
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
    date: { type: String, required: true },
    hour: { type: String, required: true },
    petname: { type: String, required: true },
    petimg: { type: String, required: true },
    careimg: { type: String, required: true },
    carename: { type: String, required: true }
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
