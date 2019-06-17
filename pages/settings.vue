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
      > <b-modal id="modal-1" title="Modificar precio de cuidos">
    <p class="">Inserte el nuevo precio:</p>
      <b-form @submit="onSubmit">
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
      <b-modal id="modal-3" title="Nuevo pais">
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
  
  
  
  </div>
</template>

<script>
export default {
  middleware: "auth",

  data() {
    return {
      form: {
        },
      fileStorage: null,
      errorString: "",
      loading: false
    };
  }
};
</script>

<style></style>
