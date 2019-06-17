<template>
  <div>
    <h2 class="title mb-4">
      Mis mascotas
    </h2>

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
    <b-table
      striped
      hover
      :items="pets"
      :fields="fields"
      primary-key="idPet"
    ></b-table>
  </div>
</template>

<script>
export default {
  middleware: "auth",

  data() {
    return {
      loading: false,
      pets: [],
      fields: [
        {
          key: "name",
          label: "Nombre",
          sortable: true
        },
        {
          key: "size",
          label: "Tamaño",
          sortable: true
        },
        {
          key: "age",
          label: "Edad",
          sortable: true
        },
        {
          key: "petDescription",
          label: "Descripción"
        },
        {
          key: "walksQuantity",
          label: "Cantidad de paseos",
          sortable: true
        }
      ]
    };
  },
  created() {
    this.loading = true;
    let userId = this.$cookies.get("user.id");
    this.$axios
      .get("/clients/" + userId + "/pets")
      .then(response => {
        this.pets = response.data;
        this.loading = false;
      })
      .catch(() => {
        alert(
          "Ha ocurrido un error al obtener las mascotas. Por favor inténtelo de nuevo más tarde"
        );
        this.loading = false;
      });
  }
};
</script>

<style></style>
