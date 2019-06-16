import Vue from "vue";

Vue.mixin({
  data: () => ({
    loadingS: false
  }),
  methods: {
    loadingStart() {
      this.$nuxt.loading.start();
      console.log("Hola del mixin");
      this.loadingS = true;
    },
    loadingFinish() {
      this.$nuxt.loading.finish();
      this.loadingS = false;
    }
  }
});
