<template>
  <div>
    <h2 class="title mb-4">Menú de opciones</h2>

    <b-alert v-show="errorString" show variant="danger">
      {{ errorString }}
    </b-alert>

    <b-row class="mb-2">
      <b-col>
        <b-button v-b-modal.modal-1 variant="primary" style="width:100%"
          >Modificar precio</b-button
        >
        <b-modal
          id="modal-1"
          title="Modificar precio de cuidos (por defecto = 30)"
          @ok="sendPrice"
        >
          <p class="">Inserte el nuevo precio:</p>
          <b-form @submit.stop.prevent="sendPrice">
            <b-form-input
              id="input-1"
              v-model="form.price"
              type="number"
              required
              placeholder="Nuevo precio"
            ></b-form-input>
          </b-form>
        </b-modal>
      </b-col>
    </b-row>

    <b-row class="mb-2">
      <b-col>
        <b-button v-b-modal.modal-2 variant="primary" style="width:100%"
          >Ingresar nuevo pais</b-button
        >
        <b-modal id="modal-2" title="Nuevo pais">
          <p class="">Ingrese el pais</p>
          <b-form @submit="onSubmit">
            <b-form-input
              id="input-2"
              v-model="form.newCountry"
              type="text"
              required
              placeholder="Ingrese el nombre del pais"
            ></b-form-input>
          </b-form>
        </b-modal>
      </b-col>
      <b-col>
        <b-button v-b-modal.modal-3 variant="primary" style="width:100%"
          >Eliminar pais</b-button
        >
        <b-modal id="modal-3" title="Eliminar pais existente">
          <p class="">Escoja el pais a eliminar</p>
          <b-form @submit="onSubmit">
            <b-form-select
              v-model="form.idCountry"
              :options="country"
              required
            ></b-form-select>
          </b-form>
        </b-modal>
      </b-col>
    </b-row>

    <b-row class="mb-2">
      <b-col>
        <b-button v-b-modal.modal-4 variant="primary" style="width:100%"
          >Ingresar nueva provincia</b-button
        >
        <b-modal id="modal-4" title="Nueva provincia">
          <b-form @submit="onSubmit">
            <p class="">Escoja el pais</p>
            <b-form-select
              v-model="form.idCountry"
              :options="country"
              required
            ></b-form-select>
            <p class="mt-2">Ingrese la provincia</p>
            <b-form-input
              id="input-3"
              v-model="form.newProvince"
              type="text"
              required
              placeholder="Ingrese el nombre de la provincia"
            ></b-form-input>
          </b-form>
        </b-modal>
      </b-col>
      <b-col>
        <b-button v-b-modal.modal-5 variant="primary" style="width:100%"
          >Eliminar provincia</b-button
        >
        <b-modal id="modal-5" title="Eliminar provincia existente">
          <b-form @submit="onSubmit">
            <p class="">Escoja el pais</p>
            <b-form-select
              v-model="form.idCountry"
              :options="country"
              required
            ></b-form-select>
            <p class="mt-2">Escoja la provincia a eliminar</p>
            <b-form-select
              v-model="form.idProvince"
              :options="province"
              required
            ></b-form-select>
          </b-form>
        </b-modal>
      </b-col>
    </b-row>

    <b-row class="mb-2">
      <b-col>
        <b-button v-b-modal.modal-6 variant="primary" style="width:100%"
          >Ingresar nuevo cantón</b-button
        >
        <b-modal id="modal-6" title="Nuev cantón">
          <b-form @submit="onSubmit">
            <p class="">Escoja el pais</p>
            <b-form-select
              v-model="form.idCountry"
              :options="country"
              required
            ></b-form-select>
            <p class="mt-2">Escoja la provincia</p>
            <b-form-select
              v-model="form.idProvince"
              :options="province"
              required
            ></b-form-select>
            <p class="mt-2">Ingrese el cantón</p>
            <b-form-input
              id="input-4"
              v-model="form.newCanton"
              type="text"
              required
              placeholder="Ingrese el nombre del cantón"
            ></b-form-input>
          </b-form>
        </b-modal>
      </b-col>
      <b-col>
        <b-button v-b-modal.modal-7 variant="primary" style="width:100%"
          >Eliminar cantón</b-button
        >
        <b-modal id="modal-7" title="Eliminar provincia existente">
          <b-form @submit="onSubmit">
            <p class="">Escoja el pais</p>
            <b-form-select
              v-model="form.idCountry"
              :options="country"
              required
            ></b-form-select>
            <p class="mt-2">Escoja la provincia</p>
            <b-form-select
              v-model="form.idProvince"
              :options="province"
              required
            ></b-form-select>
            <p class="mt-2">Escoja el cantón a eliminar</p>
            <b-form-select
              v-model="form.idCanton"
              :options="canton"
              required
            ></b-form-select>
          </b-form>
        </b-modal>
      </b-col>
    </b-row>

    <b-row class="mb-2">
      <b-col>
        <b-button v-b-modal.modal-8 variant="primary" style="width:100%"
          >Ingresar nueva universidad</b-button
        >
        <b-modal id="modal-8" title="Nueva universidad">
          <b-form @submit="onSubmit">
            <p class="">Escoja el pais</p>
            <b-form-select
              v-model="form.idCountry"
              :options="country"
              required
            ></b-form-select>
            <p class="mt-2">Ingrese la universidad</p>
            <b-form-input
              id="input-5"
              v-model="form.newUniversity"
              type="text"
              required
              placeholder="Ingrese el nombre de la universidad"
            ></b-form-input>
          </b-form>
        </b-modal>
      </b-col>
      <b-col>
        <b-button v-b-modal.modal-9 variant="primary" style="width:100%"
          >Eliminar universidad</b-button
        >
        <b-modal id="modal-9" title="Eliminar universidad existente">
          <b-form @submit="onSubmit">
            <p class="">Escoja el pais</p>
            <b-form-select
              v-model="form.idCountry"
              :options="country"
              required
            ></b-form-select>
            <p class="mt-2">Escoja la universidad a eliminar</p>
            <b-form-select
              v-model="form.idUniversity"
              :options="university"
              required
            ></b-form-select>
          </b-form>
        </b-modal>
      </b-col>
    </b-row>

    <b-button to="/mainscreen" variant="outline-primary" style="width:100%"
      >Atrás</b-button
    >
  </div>
</template>

<script>
export default {
  middleware: "auth",

  data() {
    return {
      form: {},
      fileStorage: null,
      errorString: "",
      loading: false
    };
  },
  methods: {
    sendPrice(evnt) {
      evnt.preventDefault();
      this.$axios.$post("/price", {
        price: this.form.price
      });
    }
  }
};
</script>

<style></style>
