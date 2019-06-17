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
        <b-row class="border rounded mr-2 " style="background-color: #E8E9E8">
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

              <h1 v-if="ready" class="title mb-3 " align="center">
                Hola {{ name }}
              </h1>
            </b-row>
            <b-row v-if="type == 'student'" align-h="center" class="mb-3">
              <b-button
                to="/schedule"
                variant="primary"
                class="btn btn-primary btn-lg btn-block"
                >Mis Horarios</b-button
              >
            </b-row>
            <b-row v-if="type == 'client'" align-h="center" class="mb-3">
              <b-button
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
                >Cuidados Anteriores</b-button
              >
            </b-row>
            <b-row v-if="type == 'student'" align-h="center" class="mb-3">
              <b-button
                to="/schedule"
                variant="primary"
                class="btn btn-primary btn-lg btn-block"
                >Perfil y Opciónes</b-button
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
          </b-container>
        </b-row>
      </b-col>
      <b-col>
        <b-row
          class="border rounded mb-2 pb-2"
          style="background-color: #E8E9E8"
        >
          <b-container>
            <div>
              <h2 class="title mb-2 mt-2 ">
                Próximos cuidados
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
                v-for="care in cares"
                v-else
                :key="care.idWalkService"
                :datetime="care.startTime"
                :caregiver="care.idCaregiver"
                :pet="care.idPet"
                class="mb-1"
              ></DynamicCareCard>
              <p v-if="caresDidntLoad">No hay servicios.</p>
            </div>
          </b-container>
        </b-row>
        <b-row
          class="border rounded mb-5 mt-3"
          style="background-color: #E8E9E8"
        >
          <h2 class="title mb-2 mt-2 ml-2 ">
            Tareas pendientes
          </h2>
          <b-card
            no-body
            class="overflow-hidden mb-2 ml-3"
            style="max-width: 537px;"
          >
            <b-row no-gutters style="height:100px">
              <b-col md="1"> </b-col>
              <b-col cols="4">
                <b-row class=" mr-4 mt-4">
                  <h5>Escribir reporte</h5>
                </b-row>
                <b-row>
                  <fa icon="hourglass-half" class="mr-2 mt-1"></fa> {horas}
                  restantes
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
      cares: [],
      tasks: [],
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
    this.name = data.name;
    this.ready = true;
  },
  methods: {
    loadCares() {
      let userId = this.$cookies.get("user.id");
      this.$axios
        .get("/clients/" + userId + "/services")
        .then(response => {
          this.cares = response.data;
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
