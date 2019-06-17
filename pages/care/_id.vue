<template>
  <b-container>
    <b-modal
      id="modal-complaint"
      ref="modalComplaint"
      title="Envíe una denuncia"
      centered
      cancel-variant="outline-secondary"
      cancel-title="Cancelar"
      ok-variant="danger"
      ok-title="Enviar denuncia"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="complaintState"
          label="¿Ocurrió algo con este cuidado? Por favor hágannos saber todos los detalles posibles."
          label-for="name-input"
          invalid-feedback="Campo requerido"
        >
          <b-form-textarea
            id="complaint-input"
            v-model="complaint"
            :state="complaintState"
            rows="3"
            maxlength="300"
            required
          ></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>

    <b-alert variant="success" dismissible :show="showAlert"
      >El cuidador se ha calificado correctamente.</b-alert
    >

    <b-alert variant="info" dismissible :show="showComplaintAlert"
      >El cuidador se ha calificado correctamente.</b-alert
    >
    <div v-if="ready">
      <b-row>
        <b-col cols="8">
          <b-row>
            <CareCard
              :carename="data.studentName"
              :careimg="getPersonPhoto"
              :petname="data.petName"
              :petimg="getPetPhoto"
              :date="data.startTime | moment('LL')"
              :hour="data.startTime | moment('h:mm a')"
            ></CareCard>
          </b-row>
        </b-col>
        <b-col cols="4">
          <div class="float-right">
            <b-button to="/mainscreen" variant="outline-primary"
              >Atrás</b-button
            >
            <b-button
              v-if="canReview"
              v-b-modal.modal-complaint
              variant="danger"
              >Denunciar este cuidado</b-button
            >
          </div>
        </b-col>
      </b-row>

      <b-row v-if="canReview">
        <h2 class="title mb-3 mt-3 disabled ">
          Calificar servicio:
          <StarRating
            v-model="rating"
            :read-only="alreadyReviewed"
            @rating-selected="setRating"
          ></StarRating>
        </h2>
      </b-row>
      <b-row>
        <h2 class="title mb-3 mt-3 ">
          Detalles de cuidado:
        </h2>
      </b-row>

      <div>
        <b-card-text>
          <ul>
            <li>Fecha de inicio: {{ data.startTime | moment("LLLL") }}</li>
            <li>Fecha de finalización: {{ data.endTime | moment("LLLL") }}</li>
            <li>
              Nombre del cliente: {{ data.clientName }}
              {{ data.clientLastName }}
            </li>
            <li>
              Nombre del cuidador: {{ data.studentName }}
              {{ data.studentLastName }}
            </li>
            <li>Ubicación de recogida: {{ data.pickUpLocation }}</li>
            <li>Nombre de la mascota: {{ data.petName }}</li>
            <li>Descripción de la mascota: {{ data.petDescription }}</li>
            <li v-if="data.ownerComments">
              Comentarios del servicio: {{ data.ownerComments }}
            </li>
            <li>Costo del servicio: ${{ data.price }}</li>
          </ul>
        </b-card-text>
      </div>
    </div>
    <div v-else>
      Cargando...
    </div>
  </b-container>
</template>

<script>
import StarRating from "vue-star-rating";
import CareCard from "~/components/CareCard.vue";
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  middleware: "auth",
  components: { CareCard, StarRating },
  data() {
    return {
      data: {},
      ready: false,
      alreadyReviewed: false,
      rating: 0,
      showAlert: false,
      showComplaintAlert: false,
      complaintState: null,
      complaint: ""
    };
  },

  computed: {
    canReview() {
      if (
        this.$cookies.get("user.type").toLowerCase() == "client" &&
        this.data.reportDescription
      ) {
        return true;
      } else {
        return false;
      }
    },
    getPetPhoto() {
      if (this.data.photoLinks && this.data.photoLinks.size > 0) {
        return this.data.photoLinks[0];
      } else {
        return "/img/dog.jpg";
      }
    },
    getPersonPhoto() {
      if (this.data.studentPhoto) {
        return this.data.studentPhoto;
      } else {
        return "/img/dog.jpg";
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.complaintState = valid ? "valid" : "invalid";
      return valid;
    },
    resetModal() {
      this.name = "";
      this.complaintState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.$axios
        .post("/services/" + this.$route.params.id + "/complaint", {
          description: this.complaint
        })
        .then(() => {
          this.showComplaintAlert = true;
        })
        .catch(() => {
          alert("Ya ha enviado una denuncia para este cuidado.");
        });
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modalComplaint.hide();
      });
    },
    setRating: function() {
      this.alreadyReviewed = true;
      this.$axios
        .post("/services/" + this.$route.params.id + "/rate", {
          rating: this.rating
        })
        .then(() => {
          this.showAlert = true;
        })
        .catch(() => {
          this.alreadyReviewed = false;
          alert(
            "No se ha podido enviar la calificación. Por favor inténtelo de nuevo."
          );
        });
    },
    getData() {
      let id = this.$route.params.id;
      this.$axios
        .get("/services/" + id + "/detailed")
        .then(response => {
          this.data = response.data;
          if (this.data.rating > 0) {
            this.alreadyReviewed = true;
            this.rating = this.data.rating;
          }
          this.ready = true;
        })
        .catch(() => {
          alert("El servicio no existe");
          this.$router.push({
            path: "/mainscreen"
          });
        });
    },
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    }
  }
};
</script>

<style>
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
