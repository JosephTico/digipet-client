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
          :title="name + ' ' + lastName"
          tag="article"
          style="max-width: 30rem;"
          class="mx-auto"
        >
          <b-card-sub-title class="mb-2">{{ tipoLabel }}</b-card-sub-title>
          <b-card-text>
            <h3 slot="header">Perfil de Usuario</h3>

            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Estado actual:</h4>
              <h4 v-if="state">Activo</h4>
              <h4 v-else>Cuenta inactiva</h4></b-row
            >

            <b-row v-if="type == 'student'" align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Carnet:</h4>
              <h4>{{ carne }}</h4></b-row
            >
            <b-row v-if="type == 'student'" align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Universidad:</h4>
              <h4>{{ university }}</h4></b-row
            >
            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Provincia:</h4>
              <h4>{{ province }}</h4></b-row
            >
            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Cantón:</h4>
              <h4>{{ canton }}</h4></b-row
            >
            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Teléfono:</h4>
              <h4>{{ phone }}</h4></b-row
            >
            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Email 1:</h4>
              <h4>{{ email1 }}</h4></b-row
            >
            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Email 2:</h4>
              <h4>{{ email2 }}</h4></b-row
            >
            <b-row v-if="type == 'student'" align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Cantidad de paseos:</h4>
              <h4>{{ services }}</h4></b-row
            >
            <b-row v-if="type == 'student'" align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Calificación:</h4>
              <h4>{{ rating }}</h4></b-row
            >
            <b-row align-h="between" class="ml-1 mr-1"
              ><h4 class="mr-2">Descripción:</h4></b-row
            >
            <b-card-text class="ml-1 mr-1">
              {{ desc }}
            </b-card-text>
          </b-card-text>

          <b-button class="mr-2" to="/mainscreen" variant="primary"
            >Volver</b-button
          >
          <b-button to="/schedule" variant="primary">Ver horarios</b-button>
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
      lastName: "",
      province: "",
      canton: "",
      email1: "",
      email2: "",
      phone: "",
      desc: "",
      state: true,
      ready: false,
      university: ""
    };
  },
  computed: {
    type() {
      return this.$cookies.get("user.type").toLowerCase();
    },
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
    console.log(data);
    this.avatar = data.avatar;
    this.name = data.name;
    this.province = data.idProvince;
    this.canton = data.idCanton;
    this.university = data.idUniversity;
    this.lastName = data.lastName;
    this.email1 = data.email1;
    this.email2 = data.email2;
    this.phone = data.phone;
    this.state = data.status;
    this.carne = data.idStudent;
    this.rating = data.walksRating;
    this.services = data.walksQuantity;
    this.desc = data.personalDescription;
    this.ready = true;
  },
  methods: {}
};
</script>

<style></style>
