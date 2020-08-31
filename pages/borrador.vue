<template>
  <div>
    <ReportCard
      carename="Joseph"
      careimg="https://via.placeholder.com/150"
      petname="Mascotín"
      petimg="https://via.placeholder.com/150"
      date="Hoy"
      hour="03:15 PM"
    ></ReportCard>
  </div>
</template>

<script>
import ReportCard from "~/components/ReportCard.vue";
export default {
  components: { ReportCard },
  data() {
    return {
      form: {
        file: ""
      },
      fileStorage: null,
      errorString: ""
    };
  },

  methods: {}
};
</script>

<style></style>
