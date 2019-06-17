<template>
  <div>
    <b-card
      title="A jimena le gusta debugear"
      img-src="https://cdn-images-1.medium.com/fit/c/200/200/0*_TMzlJbdYSi5goC3.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </b-card-text>
    </b-card>

    <b-alert show>Default Alert</b-alert>
    <ul>
      <li v-for="user in users" :key="user.id">
        Hola {{ user.first_name }} {{ user.last_name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  middleware: "auth",

  transition: "slide-right",
  async asyncData({ $axios }) {
    var users = await $axios.$get("https://reqres.in/api/users");
    users = users["data"];
    return { users };
  }
};
</script>

<style>
.red {
  color: red;
}
</style>
