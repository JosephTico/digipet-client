<template>
  <div center-block>
    <b-form>
      <div>
        <b-img
          thumbnail
          mx-auto
          :src="avatar"
          center
          rounded="circle"
          alt="Circle image"
          class="mt-2 mb-2"
        ></b-img>
        <b-card
          :title="name"
          tag="article"
          style="max-width: 20rem;"
          class="mx-auto"
        >
          <b-card-sub-title class="mb-2">Cuidador</b-card-sub-title>

          <FacebookLoader></FacebookLoader>

          <b-card-text>
            ¡Bienvenido a DigiPet!, estamos muy felices de incluirte en esta
            gran familia.
          </b-card-text>

          <b-button href="/mainscreen" variant="primary">Continuar</b-button>
        </b-card>
      </div>
    </b-form>
  </div>
</template>

<script>
import { FacebookLoader } from "vue-content-loader";

export default {
  components: {
    FacebookLoader
  },
  data() {
    return {
      avatar: "",
      name: ""
    };
  },
  asyncData({ $axios, redirect }) {
    let data;
    $axios
      .get("/clients")
      .then(response => {
        data = {
          avatar: response.photo,
          name: response.name
        };
      })
      .catch(error => {
        console.error("Wrong response at signupconfirm");
        this.$cookies.remove("user");
        this.$cookies.remove("user.type");
        this.$cookies.remove("user.id");
        redirect("/?forcedLogOut=1");
        console.error(error.response);
      });

    return data;
  },

  methods: {}
};
</script>

<style></style>
