<template>
  <b-container>
    <b-row>
      <b-col>
        <b-row>
          <b-container class=" mr-3">
            <b-card no-body class="overflow-hidden" style="max-width: 540px;">
              <b-row no-gutters style="height:100px">
                <b-col md="3">
                  <b-card
                    border-variant="primary"
                    align="center"
                    style="width:100px; height:100px"
                  >
                    <h3>24</h3>
                    <h5>JUN</h5>
                  </b-card>
                </b-col>
                <b-col cols="2">
                  <b-row class="mb-2 mt-4">
                    <fa icon="map-marker-alt" class="mr-2 mt-1"></fa>Linea1
                  </b-row>
                  <b-row class="mb-2">
                    <fa icon="clock" class="mr-1 mt-1"></fa>Linea2
                  </b-row>
                </b-col>
                <b-col cols="2">
                  <b-img
                    src="https://picsum.photos/250/250/?image=54"
                    center
                    rounded="circle"
                    alt="Circle image"
                    class="mu-1 mt-1"
                    style="width:90px; height:90px"
                  >
                  </b-img>
                </b-col>
                <b-col class="ml-4">
                  <b-form-row class=" mt-3 ">
                    <h4 class="title">
                      Joseph PICHAS
                    </h4>
                    <h6 class="text-muted ml-2">
                      nombre del animalejo
                    </h6>
                  </b-form-row>
                </b-col>
              </b-row>
            </b-card>
          </b-container>
        </b-row>
      </b-col>
      <b-col>
        <b-button href="/mainscreen" variant="primary">Atrás</b-button>
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
export default {
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
