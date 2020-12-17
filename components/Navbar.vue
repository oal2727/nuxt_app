<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <nuxt-link to="/" class="navbar-item">
          Home
      </nuxt-link>
      <nuxt-link to="ListPedido" class="navbar-item">
          Lista Pedido
      </nuxt-link>
       <nuxt-link to="AñadirPedido" class="navbar-item">
          Add Pedido
      </nuxt-link>
    </div>

  </div>
</nav>
</template>
<script>
export default {
    name:'navbar-component'
}
</script>