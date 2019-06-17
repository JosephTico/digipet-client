<template>
  <div>
    <b-row align-h="between">
      <b-col cols="10"
        ><h2 class="title mb-4">Pedir servicio de cuido</h2></b-col
      >
      <b-col
        ><b-button href="/mainscreen" variant="primary">Atrás</b-button></b-col
      >
    </b-row>

    <p class="lead">
      Por favor complete los siguientes datos solicitar el servicio
    </p>

    <b-alert v-show="errorString" show variant="danger">
      {{ errorString }}
    </b-alert>

    <div
      v-if="firstLoading"
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

    <b-form v-else @submit="onSubmit">
      <b-form-row>
        <b-col>
          <b-form-group label="Mascota:" for="idPet">
            <b-form-select
              id="idPet"
              v-model="form.idPet"
              class="mb-2 mr-sm-2 mb-sm-0"
              required
              :value="null"
            >
              <option slot="first" :value="null">Escoja una mascota...</option>
              <option v-for="pet in pets" :key="pet.idPet" :value="pet.idPet">{{
                pet.name
              }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Fecha:">
            <datetime
              v-model="date.date"
              input-class="form-control"
              required
            ></datetime>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Hora inicio:">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="date.startHour"
              class="mb-2 mr-sm-2 mb-sm-0"
              required
              :value="null"
              :options="[
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23
              ]"
            >
              <option slot="first" :value="null"
                >Escoja una Hora de inicio...</option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="0">
          <h2 class="mt-4">:</h2>
        </b-col>
        <b-col>
          <b-form-group class="" label=" ">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="date.startMinutes"
              class="mb-2 mr-sm-2 mb-sm-0 mt-4"
              required
              :value="null"
              :options="{ 0: '00', 30: '30' }"
            >
              <option slot="first" :value="null">Escoja una opción...</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Hora final:">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="date.endHour"
              class="mb-2 mr-sm-2 mb-sm-0"
              required
              :value="null"
              :options="finalHour"
            >
              <option slot="first" :value="null"
                >Escoja una Hora final...</option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="0">
          <h2 class="mt-4">:</h2>
        </b-col>
        <b-col>
          <b-form-group class="" label=" ">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="date.endMinutes"
              class="mb-2 mr-sm-2 mb-sm-0 mt-4"
              required
              :value="null"
              :options="finalMinute"
            >
              <option slot="first" :value="null">Escoja una opción...</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Lugar de recogida:">
            <b-form-textarea
              id="textarea"
              v-model="form.PickUpLocation"
              placeholder="Describa el lugar de recogida"
              required
              rows="2"
              max-rows="3"
              maxlength="300"
            >
            </b-form-textarea>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group label="Comentarios:">
            <b-form-textarea
              id="textarea"
              v-model="form.OwnerComments"
              placeholder="Inserte comentarios o requerimientos especiales para el cuido de su mascota"
              rows="3"
              max-rows="6"
              maxlength="300"
            >
            </b-form-textarea>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-button
        v-if="loading"
        type="submit"
        variant="primary"
        style="width:100%"
        disabled
      >
        <b-spinner small label="Small Spinner"></b-spinner>
      </b-button>
      <b-button v-else type="submit" variant="primary" style="width:100%"
        >Confirmar solicitud</b-button
      >
    </b-form>
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
      form: {
        file: ""
      },
      date: {
        startHour: "9",
        startMinutes: "30",
        endHour: "16",
        endMinutes: "30"
      },
      fileStorage: null,
      errorString: "",
      firstLoading: true,
      loading: false,
      pets: []
    };
  },

  computed: {
    finalHour() {
      let list = [];
      let counter = this.date.startHour;
      if (this.date.startMinutes == 30) counter++;
      while (counter < 24) {
        list.push(counter);
        counter++;
      }
      return list;
    },
    finalMinute() {
      if (this.date.startHour == this.date.endHour) {
        return { 30: "30" };
      } else {
        return { 0: "00", 30: "30" };
      }
    }
  },

  created() {
    let userId = this.$cookies.get("user.id");

    this.$axios
      .get("/clients/" + userId + "/pets")
      .then(response => {
        this.pets = response.data;
        this.firstLoading = false;
      })
      .catch(() => {
        alert(
          "Ha ocurrido un error al obtener las mascotas. Por favor inténtelo de nuevo más tarde"
        );
        this.firstLoading = false;
      });
  },

  methods: {
    sendRequest() {
      alert("Aqui se envia todo jejps");
      this.loading = false;
    },
    loadPrice() {
      console.log("Aqui calculo el precio");
    },
    loadCareGiver() {
      this.$axios
        .$post("/services/availability", {
          idPet: this.form.idPet,
          idPetOwner: this.$cookies.get("user.id"),
          startTime: this.form.startTime,
          endTime: this.form.endTime,
          location: " "
        })
        .then(response => {
          console.log(response);
          this.loadPrice();
        })
        .catch(error => {
          console.error(error.response);
          let msg = this.errorParser(error);
          this.loading = false;
          this.$bvModal.msgBoxOk(msg, {
            title: "Lo sentimos",
            centered: true,
            hideHeaderClose: true
          });
        });
    },
    confirmRequest() {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm("¿Desea confirmar esta solicitud?", {
          title: "Por favor confirme",
          size: "sm",
          okTitle: "Sí",
          cancelTitle: "No",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) this.sendRequest();
          else this.loading = false;
        });
    },
    onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      this.prepareData();
      this.loadCareGiver();
    },

    prepareData() {
      let startDate = new Date(this.date.date);
      let endDate = new Date(this.date.date);
      startDate.setUTCHours(this.date.startHour, this.date.startMinutes);
      endDate.setUTCHours(this.date.endHour, this.date.endMinutes);

      this.form.startTime = startDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      this.form.endTime = endDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    }
  }
};
</script>

<style></style>
