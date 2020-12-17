<template>
  <div>
    <Navbar/>
   <div class="container" style="margin-bottom: 15px;">
      <Nuxt />
   </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar'
export default {
  components:{
    Navbar
  },
}
</script>