import has from "lodash";
import Vue from "vue";

Vue.mixin({
  methods: {
    errorParser(error) {
      if (has(error.response, "data")) {
        if (has(error.response.data, "error")) {
          return error.response.data.error;
        } else {
          return "Ha ocurrido un error. Por favor inténtelo de nuevo.";
        }
      } else {
        return "Ha ocurrido un error. Por favor inténtelo de nuevo.";
      }
    }
  }
});
