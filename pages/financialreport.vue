<template>
  <div>
    <h2 class="title mb-4">
      Reportes financieros
      <b-button to="/mainscreen" variant="outline-primary">Atrás</b-button>
    </h2>
    <b-row>
      <b-col>
        <b-form-group label="Fecha inicio:">
          <datetime
            v-model="startDate"
            input-class="form-control"
            required
            value-zone="local"
            zone="local"
            @input="changeDates"
          ></datetime>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Fecha final:">
          <datetime
            v-model="endDate"
            input-class="form-control"
            required
            value-zone="local"
            zone="local"
            :min-datetime="startDate"
            @input="changeDates"
          ></datetime>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      striped
      hover
      :items="reports"
      :filter="filter"
      primary-key="idCaregiver"
      @filtered="onFiltered"
    ></b-table>

    <div
      v-if="loading"
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
  </div>
</template>

<script>
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

export default {
  middleware: "auth",
  components: {
    datetime: Datetime
  },

  data() {
    return {
      loading: false,
      filter: null,
      startDate: "",
      endDate: "",
      reports: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      },
      fields: [
        {
          key: "name",
          label: "Nombre",
          sortable: true
        },
        {
          key: "lastName",
          label: "Apellido",
          sortable: true
        },
        {
          key: "idStudent",
          label: "Carnet",
          sortable: true
        },
        {
          key: "idProvince",
          label: "Provincia",
          sortable: true
        },
        {
          key: "walksQuantity",
          label: "Paseos realizados",
          sortable: true
        },
        {
          key: "walksRating",
          label: "Calificación",
          sortable: true
        },
        {
          key: "inscriptionDate",
          label: "Fecha de inscripción",
          sortable: true
        },
        {
          key: "status",
          label: "Estado",
          sortable: true
        }
      ]
    };
  },
  computed: {
    studentList() {
      return this.caregiver.map(item => {
        return {
          idCaregiveer: item.idCaregiveer,
          name: item.name,
          lastName: item.lastName,
          idStudent: item.idStudent,
          idProvince: item.idProvince,
          walksQuantity: item.walksQuantity,
          walksRating: item.walksRating,
          inscriptionDate: new Date(item.inscriptionDate).toUTCString(),
          status: this.status(item.status)
        };
      });
    }
  },
  created() {
    this.updateReports();
  },
  methods: {
    updateReports() {
      this.loading = true;
      this.$axios
        .post("/administrators/report", {
          startDate: this.startDate,
          endDate: this.endDate
        })
        .then(response => {
          this.reports = response.data;
          this.loading = false;
        })
        .catch(() => {
          alert(
            "Ha ocurrido un error al obtener los reportes. Por favor inténtelo de nuevo más tarde"
          );
          this.loading = false;
        });
    },
    changeDates() {
      if (
        new Date(this.startDate).getTime() > new Date(this.endDate).getTime()
      ) {
        this.endDate = "";
      }
      this.updateReports();
    },
    status(number) {
      if (number == 0) {
        return "Desactivado";
      } else if (number == 1) {
        return "Activado";
      } else {
        return "Bloqueado";
      }
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style></style>
