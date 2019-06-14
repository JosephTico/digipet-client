<template>
    <div>
         <b-card
    title="Card Title"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
  
        <b-alert show>Default Alert</b-alert>
        <h1 class="red">Hello {{ name }}!</h1>
        <ul>
            <li v-for="user in users">
                Hola {{user}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
 async asyncData({ $axios }) {
  var users = await $axios.$get('https://reqres.in/api/users');
  users = users["data"];
  return { users }
}

}
</script>

<style>
.red {
  color: red;
}
</style>