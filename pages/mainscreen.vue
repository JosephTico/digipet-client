<template>
  <b-row>
    <b-container>
      <b-row>
        <b-col>
          <b-row class="border rounded mr-2">
            <b-img
              thumbnail
              mx-auto
              src="https://picsum.photos/250/250/?image=54"
              center
              rounded="circle"
              alt="Circle image"
              class="mt-2"
            >
            </b-img>
            <b-container class="ml-3 mr-3">
              <b-row>
                <h1 class="title mb-3 " align="center">Hola {Nombre}</h1>
              </b-row>
              <b-row align-h="center" class="mb-3">
                <b-button
                  to="/"
                  variant="primary"
                  class="btn btn-primary btn-lg btn-block"
                  >Mis Horarios</b-button
                >
              </b-row>
              <b-row align-h="center" class="mb-3">
                <b-button
                  to="/"
                  variant="primary"
                  class="btn btn-primary btn-lg btn-block"
                  >Cuidados Anteriores</b-button
                >
              </b-row>
              <b-row align-h="center" class="mb-3">
                <b-button
                  to="/"
                  variant="primary"
                  class="btn btn-primary btn-lg btn-block"
                  >Perfil y Opciónes</b-button
                >
              </b-row>
            </b-container>
          </b-row>
        </b-col>
        <b-col>
          <b-row class="border rounded mb-2">
            <b-container>
              <div>
                <h2 class="title mb-2 mt-2 ">
                  Próximos cuidados
                </h2>

                <b-card
                  no-body
                  class="overflow-hidden mt-1"
                  style="max-width: 540px;"
                >
                  <b-row no-gutters style="height:100px">
                    <b-col md="3">
                      <b-card
                        border-variant="primary"
                        align="center"
                        style="width:100px; height:100px"
                      >
                        <b-card-text>Lorem ipsum dolor s.</b-card-text>
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

                <b-button
                  to="/"
                  variant="primary"
                  class="btn btn-primary btn-lg btn-block mt-2 mb-2"
                  >Ver más</b-button
                >
              </div>
            </b-container>
          </b-row>
          <b-row class="border rounded mb-5">
            <h2 class="title mb-2 mt-2 ml-2 ">
                  Tareas pendientes
                </h2>
              <b-card
                  no-body
                  class="overflow-hidden mt-1"
                  style="max-width: 540px;"
                >
                  <b-row no-gutters style="height:100px">
                    <b-col md="3">
                      <b-card
                        border-variant="primary"
                        align="center"
                        style="width:100px; height:100px"
                      >
                        <b-card-text>Lorem ipsum dolor s.</b-card-text>
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
          </b-row>
        </b-col>
      </b-row>
      <script></script>

      <style>
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      </style>
    </b-container></b-row
  ></template
>
