<template>
  <div>
    <b-row align-h="between">
      <b-col cols="10"><h2 class="title mb-4">Cuidados Anteriores</h2></b-col>
      <b-col
        ><b-button href="/mainscreen" variant="primary">Atrás</b-button>
        <b-button href="/mainscreen" variant="danger">Denuncial</b-button>
      </b-col>

      <b-row class="border rounded mb-2" style="background-color: #E8E9E8">
        <b-container>
          <div>
            <b-card no-body class="overflow-hidden mt-1">
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
                <b-col cols="4 ">
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
                    <h3 class="title">
                      Joseph PICHAS
                    </h3>
                    <h5 class="text-muted ml-2">
                      nombre del animalejo
                    </h5>
                  </b-form-row>
                </b-col>
              </b-row>
            </b-card>
          </div>
        </b-container>
      </b-row>
    </b-row>
  </div>
</template>

<script>
export default {
  middleware: "auth",

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
