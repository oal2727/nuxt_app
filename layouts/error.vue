<template>
  <div style="text-align:center;">
    <h1 v-if="error.statusCode === 404" class="title is-1">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/" class="subtitle is-1">Click here return Home page</NuxtLink>
  </div>

</template>

// <script>
  export default {
    props: ['error'],
    layout: 'error'
  }
</script>