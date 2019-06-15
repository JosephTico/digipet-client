import Vue from "vue";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);

Vue.mixin({
  methods: {
    checkLoggedIn() {
      return this.$cookies.get("user");
    }
  }
});

export default function({ $axios }) {
  $axios.onRequest(config => {
    config.headers.common["Authorization"] = "Test";
  });
}
