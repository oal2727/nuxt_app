<template>
    <div class="card column is-one-quarter" style="width:300px;margin-top:10px;margin-left:10px;">
  <div class="card-image">
      <!-- problema de modulos al querer mostrar imagen 
     a veces funcion con require y _nuxt/assets 
     ---------
     -->
    <figure class="image is-4by3">
      <img :src="require(`../assets/${imagen}`)" >
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content" style="text-align:center;">
        <h1 class="title is-4">{{author}}</h1>
      </div>
    </div>

    <div class="content">
      <!-- <p class="text-center">Libro : {{nombre}}</p>
      <p>{{detalle}}</p> -->
      <div style="text-align:center;">
      <p class="title is-6">Libro : {{nombre}}</p>
      <p class="title is-5">Detalle:</p>
      <span>{{detalle}}</span>
        </div>
      <br>
      <!-- <p>Fecha Creada : {{moment(fecha).format("MM")}}</p> -->
      <!-- <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
    </div>
    <div style="display:flex;justify-content:space-between;">
      <button @click="Editar(item)" type="submit"  class="button is-warning">Edit Pedido</button>
    <button type="submit" @click="Delete(id)" class="button is-danger">Delete Pedido</button>
    </div>

  </div>
</div>

</template>
<script>
import {mapActions,mapMutations} from 'vuex'
export default {
    name:'CardPedido',
   props:['author','detalle','nombre','imagen','id',"item","fecha"],
   methods:{
     ...mapActions(['DeleteLibro']),
     ...mapMutations(['EDIT_LIBRO']),
     ...mapMutations(['TOGGLE_STATUS_IMAGE']),
      getImage(image){
        return `../assets/${image}`
      },
     Editar(){
        this.EDIT_LIBRO(this.item)
        this.TOGGLE_STATUS_IMAGE(false)
        this.$router.push({name:'AñadirPedido',params:{nombre:this.item.authorlibro}})
     },
     Delete(){
       console.log("delete data")
      //  this.showAlert()
          this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.DeleteLibro(this.id)
          this.$swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
       
     },
  },
  head(){
   return{
      link:[
      {
          rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
            href:'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,200&display=swap'

      }
    ]
   }
  }
}
</script>
<style>
  h1 {
     font-family: Roboto, sans-serif;
  }
  p{
    font-family: 'Montserrat', sans-serif;

  }
 
</style>
<!-- 

tomar en cuenta 4 variables
add pedido
-------------
isbn Libro
nombre libro
imagen del libro
detalle del libros
fecha de que se creo

lista pedidos
-------
filtrado por letra
editar
eliminar
actualizar 
limite de imagenes => 8


-----
animacion de css => eliminar o cambio de pagina

--------------
proyecto mas adeltante
-"paginacion"
-trabajo con videos otra lista
-->