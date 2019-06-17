<template>
  <b-card style="height: 150px" no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col cols="4">
        <b-card-body title="Reporte de cuido">
          <b-card-text class="mx-auto text-center">
            <p><fa icon="hourglass-half"></fa> 4 horas restantes</p>
          </b-card-text>
        </b-card-body>
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
            <p class="mb-2"><fa icon="user"></fa> {{ carename }}</p>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>
confkrmar solicirud oeri a
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
}

.card img {
  max-height: 150px;
}
</style>
