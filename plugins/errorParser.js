import has from "lodash";
import Vue from "vue";

Vue.mixin({
  methods: {
    errorParser(error) {
      if (has(error, "response")) {
        if (has(error.response, "data")) {
          if (has(error.response.data, "error")) {
            return error.response.data.error;
          } else {
            console.error("DigiPet Error R001");
            return "Ha ocurrido un error. Por favor inténtelo de nuevo.";
          }
        } else {
          console.error("DigiPet Error R002");
          return "Ha ocurrido un error. Por favor inténtelo de nuevo.";
        }
      } else {
        console.error("DigiPet Error R003");
        return "Ha ocurrido un error. Por favor inténtelo de nuevo.";
      }
    }
  }
});
