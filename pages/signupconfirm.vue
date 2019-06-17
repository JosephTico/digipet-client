<template>
  <div center-block>
    <b-form>
      <div>
        <b-img
          v-if="ready"
          thumbnail
          mx-auto
          :src="avatar"
          center
          rounded="circle"
          alt="Circle image"
          class="mt-2 mb-2"
          style="width: 200px; height: 200px;object-fit:cover"
        ></b-img>
        <b-card
          v-if="ready"
          :title="name"
          tag="article"
          style="max-width: 20rem;"
          class="mx-auto"
        >
          <b-card-sub-title class="mb-2">{{ tipoLabel }}</b-card-sub-title>

          <b-card-text>
            ¡Bienvenido a DigiPet!, estamos muy felices de incluirte en esta
            gran familia.
          </b-card-text>

          <b-button href="/mainscreen" variant="primary">Continuar</b-button>
        </b-card>
        <b-card
          v-else
          :title="name"
          tag="article"
          style="max-width: 20rem;"
          class="mx-auto"
        >
          <div class="d-flex align-items-center">
            <strong>Cargando...</strong>
            <div
              class="spinner-border ml-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        </b-card>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  middleware: "auth",

  data() {
    return {
      avatar: "",
      name: "",
      ready: false
    };
  },
  computed: {
    tipoLabel() {
      if (this.$cookies.get("user.type").toLowerCase() == "student")
        return "Cuidador";
      if (this.$cookies.get("user.type").toLowerCase() == "admin")
        return "Administrador";

      return "Cliente";
    }
  },
  async created() {
    var data = await this.fetchProfile();
    this.avatar = data.avatar;
    this.name = data.name;
    this.ready = true;
  },
  methods: {}
};
</script>

<style></style>
