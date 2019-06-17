import Vue from "vue";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);

Vue.mixin({
  methods: {
    checkLoggedIn() {
      return this.$cookies.isKey("user");
    },
    fetchProfile() {
      let data;
      let url = "/clients";

      if (this.$cookies.get("user.type").toLowerCase() == "student")
        url = "/students";
      if (this.$cookies.get("user.type").toLowerCase() == "admin")
        url = "/administrators";

      return this.$axios
        .get(url)
        .then(response => {
          data = {
            avatar: response.data.photo,
            name: response.data.name,
            ready: true
          };
          return data;
        })
        .catch(error => {
          console.error("Wrong response at signupconfirm");
          this.$cookies.remove("user");
          this.$cookies.remove("user.type");
          this.$cookies.remove("user.id");
          this.$router.push({
            path: "/?forcedLogOut=1"
          });
          console.error(error.response);
        });
    }
  }
});

export default function({ $axios }) {
  if (VueCookies.isKey("user")) {
    $axios.defaults.timeout = 50000;
    $axios.onRequest(config => {
      config.headers.common["Authorization"] = VueCookies.get("user");
    });
  }
}
