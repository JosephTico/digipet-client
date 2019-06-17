<template>
  <div>
    <b-row align-h="between">
      <b-col cols="10"><h2 class="title mb-4">Cuidados Anteriores</h2></b-col>
      <b-col
        ><b-button to="/mainscreen" variant="outline-primary">Atrás</b-button>
      </b-col>

      <b-row class="border rounded mb-2" style="background-color: #E8E9E8">
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
          :cid="care.idWalkService"
          class="mb-1"
        ></DynamicCareCard>
        <b-card
          v-if="caresDidntLoad"
          class="d-flex align-items-center"
          style="width:100%;height:150px;"
        >
          <strong>No hay servicios...</strong>
        </b-card>
      </b-row>
    </b-row>
  </div>
</template>

<script>
import DynamicCareCard from "~/components/DynamicCareCard.vue";

export default {
  middleware: "auth",
  components: { DynamicCareCard },
  data() {
    return {
      errorString: "",
      caresLoading: true,
      caresDidntLoad: false
    };
  },
  async created() {
    this.loadCares();
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
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
};
</script>

<style></style>
