import get from "lodash/get";
import Vue from "vue";

Vue.mixin({
  methods: {
    errorParser(error) {
      console.error(error);
      console.error(JSON.stringify(error));
      return get(
        error,
        "response.data.error",
        "Ha ocurrido un error. Por favor inténtelo de nuevo"
      );
    }
  }
});
