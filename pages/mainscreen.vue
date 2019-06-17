<template>
  <b-row>
    <b-alert v-if="$route.query.action == 'newPet'" show dismissible
      >La mascota se ha añadido correctamente.</b-alert
    >
    <b-alert v-if="$route.query.action == 'newCare'" show dismissible
      >El cuidado se ha programado correctamente.</b-alert
    >

    <b-row>
      <b-col>
        <b-row class="border rounded mr-2 " style="background-color: #FBF8DE">
          <b-img
            v-if="ready && avatar"
            thumbnail
            mx-auto
            :src="avatar"
            center
            rounded="circle"
            alt="Circle image"
            class="mt-2"
            style="width:250px;height:250px;object-fit:cover;"
          >
          </b-img>
          <b-container class="ml-3 mr-3">
            <b-row>
              <div
                v-if="!ready"
                class="d-flex align-items-center"
                style="width:100%;height:310px;"
              >
                <strong>Cargando...</strong>
                <div
                  class="spinner-border ml-auto"
                  role="status"
                  aria-hidden="true"
                ></div>
              </div>

              <h1
                v-if="ready"
                class="title mb-3"
                align="center"
                style="width: 100%;"
              >
                Hola {{ name }}
              </h1>
              <p v-if="!status" class="text-center" style="width:100%">
                (cuenta inactiva)
              </p>
            </b-row>
            <b-row v-if="type == 'student'" align-h="center" class="mb-3">
              <b-button
                to="/schedule"
                variant="primary"
                :disabled="!status"
                class="btn btn-primary btn-lg btn-block"
                >Mis horarios</b-button
              >
            </b-row>
            <b-row v-if="type == 'client'" align-h="center" class="mb-3">
              <b-button
                :disabled="!status"
                to="/carerequest"
                variant="primary"
                class="btn btn-primary btn-lg btn-block"
                >Solicitar cuidado</b-button
              >
            </b-row>
            <b-row v-if="type != 'admin'" align-h="center" class="mb-3">
              <b-button
                to="/caresrecord"
                variant="primary"
                class="btn btn-primary btn-lg btn-block"
                >Cuidados anteriores</b-button
              >
            </b-row>
            <b-row v-if="type == 'client'" align-h="center" class="mb-3">
              <b-button
                to="/pets"
                variant="primary"
                class="btn btn-primary btn-lg btn-block"
                >Mis mascotas</b-button
              >
            </b-row>
            <b-row v-if="type != 'admin'" align-h="center" class="mb-3">
              <b-button
                to="/profile"
                variant="primary"
                class="btn btn-primary btn-lg btn-block"
                >Ver perfil</b-button
              >
            </b-row>
            <b-row v-if="type == 'admin'" align-h="center" class="mb-3">
              <b-button
                to="/studentslist"
                variant="primary"
                class="btn btn-primary btn-lg btn-block"
                >Lista de cuidadores</b-button
              >
            </b-row>
            <b-row v-if="type == 'admin'" align-h="center" class="mb-3">
              <b-button
                to="/settings"
                variant="primary"
                class="btn btn-primary btn-lg btn-block"
                >Ajustes</b-button
              >
            </b-row>
            <b-row v-if="type == 'admin'" align-h="center" class="mb-3">
              <b-button
                to="/financialreport"
                variant="primary"
                class="btn btn-primary btn-lg btn-block"
                >Generar reporte financiero</b-button
              >
            </b-row>
          </b-container>
        </b-row>
      </b-col>
      <b-col>
        <b-row
          class="border rounded mb-2 pb-2"
          style="background-color: #FBF8DE"
        >
          <b-container>
            <div>
              <h2 class="title mb-2 mt-2 ">
                <span v-if="type == 'student'">Mis cuidados asignados</span>
                <span v-else>Próximos cuidados</span>
              </h2>
              <b-card
                v-if="caresLoading"
                class="d-flex align-items-center"
                style="width:100%;height:150px;"
              >
                <strong>Cargando...</strong>
                <div
                  class="spinner-border ml-auto"
                  role="status"
                  aria-hidden="true"
                ></div>
              </b-card>
              <DynamicCareCard
                v-for="care in caresFuture"
                v-else
                :key="care.idWalkService"
                :datetime="care.startTime"
                :caregiver="care.idCaregiver"
                :pet="care.idPet"
                :cid="care.idWalkService"
                class="mb-1 mx-auto"
              ></DynamicCareCard>
              <p v-if="!caresLoading && caresFuture.length == 0">
                No hay servicios.
              </p>
            </div>
          </b-container>
        </b-row>
        <b-row
          class="border rounded mb-5 mt-3 pb-2"
          style="background-color: #FBF8DE"
        >
          <h2 class="title mb-2 mt-2 ml-2" style="width: 100%;clear:both;">
            <span v-if="type == 'student'">Pendientes de reportar</span>
            <span v-else>Pendientes de calificar</span>
          </h2>
          <b-card
            v-if="caresLoading"
            class="d-flex align-items-center"
            style="width:100%;height:150px;"
          >
            <strong>Cargando...</strong>
            <div
              class="spinner-border ml-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </b-card>
          <DynamicCareCard
            v-for="care in caresPending"
            v-else
            :key="care.idWalkService"
            :datetime="care.startTime"
            :caregiver="care.idCaregiver"
            :pet="care.idPet"
            :cid="care.idWalkService"
            class="mb-1 mx-auto"
          ></DynamicCareCard>
          <p v-if="!caresLoading && caresPending.length == 0" class="px-3">
            No hay servicios.
          </p>
        </b-row>
      </b-col>
    </b-row>
  </b-row>
</template>

<script>
import DynamicCareCard from "~/components/DynamicCareCard.vue";

export default {
  middleware: "auth",
  components: { DynamicCareCard },
  data() {
    return {
      avatar: "",
      name: "",
      ready: false,
      caresFuture: [],
      caresPending: [],
      tasks: [],
      status: true,
      caresLoading: true,
      caresDidntLoad: false
    };
  },
  computed: {
    type() {
      return this.$cookies.get("user.type").toLowerCase();
    }
  },
  async created() {
    this.loadCares();
    this.loadTasks();
    var data = await this.fetchProfile();
    this.avatar = data.avatar;
    this.status = data.status;
    this.name = data.name;
    this.ready = true;
  },
  methods: {
    loadCares() {
      let userId = this.$cookies.get("user.id");
      this.$axios
        .get("/" + this.type + "s/" + userId + "/services")
        .then(response => {
          this.caresFuture = response.data.filter(item => {
            if (this.type == "client") {
              return !item.reportDescription;
            } else {
              return (
                Date.parse(item.endTime) - Date.parse(new Date()) > 0 &&
                !item.reportDescription
              );
            }
          });
          this.caresPending = response.data.filter(item => {
            if (this.type == "client") {
              return item.reportDescription && item.rating == 0;
            } else {
              return (
                Date.parse(item.endTime) - Date.parse(new Date()) <= 0 &&
                !item.reportDescription
              );
            }
          });
          this.caresLoading = false;
        })
        .catch(() => {
          this.caresLoading = false;
          this.caresDidntLoad = true;
        });
    },
    loadTasks() {}
  }
};
</script>

<style scoped>
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
