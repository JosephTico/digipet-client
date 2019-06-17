<template>
  <div>
    <h2 class="title mb-4">
      Cuidadores registrados
      <b-button to="/mainscreen" variant="outline-primary">Atrás</b-button>
    </h2>

    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input
              v-model="filter"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-table
      striped
      hover
      :items="studentList"
      :fields="fields"
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
export default {
  middleware: "auth",

  data() {
    return {
      loading: false,
      filter: null,
      caregiver: [],
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
    this.loading = true;
    this.$axios
      .get("/administrators/students")
      .then(response => {
        this.caregiver = response.data;
        this.loading = false;
      })
      .catch(() => {
        alert(
          "Ha ocurrido un error al obtener los cuidadores. Por favor inténtelo de nuevo más tarde"
        );
        this.loading = false;
      });
  },
  methods: {
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
