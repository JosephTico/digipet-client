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
              class="mu-2"
            >
            </b-img>
            <b-container>
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
                <h2 class="title mb-3 mu-2 ">Próximos Cuidados</h2>

                <b-card
                  no-body
                  class="overflow-hidden"
                  style="max-width: 540px;"
                >
                  <b-row no-gutters>
                    <b-col md="3">
                      <b-card border-variant="primary" align="center">
                        <b-card-text
                          >Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.</b-card-text
                        >
                      </b-card>
                    </b-col>
                    <b-col md="6">
                      <b-card-body title="Horizontal Card">
                        <b-card-text>
                          This is a wider card with supporting text as a natural
                          lead-in to additional content. This content is a
                          little bit longer.
                        </b-card-text>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
              </div>
            </b-container>
          </b-row>
          <b-row class="border rounded mb-5">
            Reportes
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
