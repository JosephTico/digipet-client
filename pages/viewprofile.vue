<template>
  <div center-block>
    <b-form>
      <div>
        <b-img
          v-if="ready"
          thumbnail
          mx-auto
          :src="avatar"
          center
          rounded="circle"
          alt="Circle image"
          class="mt-2 mb-2"
          style="width: 200px; height: 200px;object-fit:cover"
        ></b-img>
        <b-card
          v-if="ready"
          :title="name"
          tag="article"
          style="max-width: 30rem;"
          class="mx-auto"
        >
          <b-card-sub-title class="mb-2">{{ tipoLabel }}</b-card-sub-title>
          <b-card-text>
            <h3 slot="header">Perfil de Usuario</h3>

            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Estado actual:</h4>
              <h4>{estado}</h4></b-row
            >

            <b-row v-if="type == 'student'" align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Carnet:</h4>
              <h4>{carne}</h4></b-row
            >
            <b-row v-if="type == 'student'" align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Universidad:</h4>
              <h4>{Universidad}</h4></b-row
            >
            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Provincia:</h4>
              <h4>{Provincia}</h4></b-row
            >
            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Cantón:</h4>
              <h4>{Cantón}</h4></b-row
            >
            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Teléfono:</h4>
              <h4>{Teléfono}</h4></b-row
            >
            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Email 1:</h4>
              <h4>{Email 1}</h4></b-row
            >
            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Email 2:</h4>
              <h4>{Email 2}</h4></b-row
            >
            <b-row v-if="type == 'student'" align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Cantidad de paseos:</h4>
              <h4>{#Paseos}</h4></b-row
            >
            <b-row v-if="type == 'student'" align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Calificación:</h4>
              <h4>{Calificación}</h4></b-row
            >
            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Descripción:</h4></b-row
            >
            <b-card-text class="ml-1 mr-1">
              {descripción de la vara de la vara jaja}
            </b-card-text>
          </b-card-text>

          <b-button class="mr-2" to="/mainscreen" variant="primary">Volver</b-button>
          <b-button href="/schedule" variant="primary">Ver horarios</b-button>
        </b-card>
        <b-card
          v-else
          :title="name"
          tag="article"
          style="max-width: 20rem;"
          class="mx-auto"
        >
          <div class="d-flex align-items-center">
            <strong>Cargando...</strong>
            <div
              class="spinner-border ml-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        </b-card>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  middleware: "auth",

  data() {
    return {
      avatar: "",
      name: "",
      ready: false
    };
  },
  computed: {
    tipoLabel() {
      if (this.$cookies.get("user.type").toLowerCase() == "student")
        return "Cuidador";
      if (this.$cookies.get("user.type").toLowerCase() == "admin")
        return "Administrador";

      return "Cliente";
    }
  },
  async created() {
    var data = await this.fetchProfile();
    this.avatar = data.avatar;
    this.name = data.name;
    this.ready = true;
  },
  methods: {}
};
</script>

<style></style>
