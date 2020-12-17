<template>
   <div style="margin-top:20px;">
       <!-- <p>*falta update pedido </p>
       <p>*Filtrado por Nombre de libro</p> -->
       <div style="display:flex;flex-wrap:wrap;margin-top:20px;" class="container columns">
           <!-- <div v-if="pedidos.length < 0">
               <h1>no hay datos</h1>
           </div>
           <div v-else> -->
                 <CardPedido 
       v-for="libro in libros"
       :key="libro._id"
       :author="libro.authorlibro"
       :nombre="libro.nombrelibro"
       :detalle="libro.detalle"
       :fecha="libro.created_at"
        :imagen="libro.imageId"
        :id="libro._id"
        :item="libro"
       />
           <!-- </div> -->
       <!-- <ul>
          <li v-for="pedido in pedidos" :key="pedido._id">
              {{pedido.authorlibro}}
              </li> 
       </ul> -->
       <!-- <CardPedido/>
       <CardPedido/>
       <CardPedido/> -->
           </div>   
   </div>
</template>
<script>
import axios from 'axios'
import CardPedido from '../components/CardPedido'
import {mapState,mapActions} from 'vuex'
export default {
    components:{
        CardPedido
    },
    computed:{
        ...mapState(['todo']),
        ...mapState(['libros']),

    },
    data(){
        return{
            search:null
        }
    },
    methods:{
        ...mapActions(['GetLibros'])
    },
    created(){
        this.GetLibros()
    },
   head:{
       //tema de SEO
         title:'List Books',
        meta:[
        {
            hid:'description',
            name:'Lista de Libros',
            content:'List Page Description'
        }
    ]
   }
        // const response = await axios.get("book")
        // console.log(response)
}
//https://axios.nuxtjs.org/usage.html#component
</script>
