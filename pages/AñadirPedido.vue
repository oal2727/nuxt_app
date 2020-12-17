<template>
    <div class="columns" style="margin-top:15px;">
        <div class="column">
                <div class="card" style="width: 350px;margin:auto;">
        <div class="card-header">
            <p class="card-header-title" v-if="libro.id===''">
           Add Libro
            </p>
                 <p class="card-header-title" v-else>
           Edit Libro  
            </p>
        </div>
        <div class="card-content">
            <form @submit.prevent="AñadirPedido()">
                  <div class="control field">
               <input class="input" type="text" placeholder="Nombre Author" v-model="libro.author">
           </div>
             <div class="control field">
               <input class="input" type="text" placeholder="Nombre Libro" v-model="libro.nombre">
           </div>
           <div class="control field">
        <div class="file is-primary is-boxed" style="display:block;">
            <label class="file-label">
            <input class="file-input" type="file" name="resume" @change="changeImage">
            <span class="file-cta" style="margin:auto;">
                <span class="file-icon">
                <i class="fas fa-cloud-upload-alt"></i>
                </span>
                <span class="file-label">
                Warning file…
                </span>
            </span>
            </label>
        </div>
        </div>
           <div class="control field">
        <textarea class="textarea" placeholder="Detalle Libro" v-model="libro.detalle"></textarea>
        </div>
            <div v-if="libro.id === ''">
                 <button type="submit" class="button is-primary">Add Pedido</button>
             </div>
             <div v-else>
               <!-- <button type="button"   @click="Cancelar()" class="button is-danger">Cancelar</button> -->
               <input type="button" @click="Cancelar()" class="button is-danger" value="Cancelar">
                 <button type="submit" class="button is-success">Update Pedido</button>

             </div>

                </form>
        </div>
    </div>
        </div>

    <div class="column" style="align-self:center;outline-style:dashed;width:50%;margin:auto;">
        <h1 class="title is-3" style="text-align:center;color:orange;">{{libro.nombre}}</h1>
         <!-- <img :src="file" style="width:300px;height:300px;margin-right:auto;margin-left:auto;display:block;" v-if="file !== null" /> -->
         <div v-if="libro.imagen === null">
                <p>imagen vacia</p>
            </div>
            <div v-else style="text-align:center;">
                    <img :src="file" v-if="statusimage"  width="300" height="300">
                     <img :src="require(`../assets/${libro.imagen}`)" width="200" height="200" v-else>
            </div>
     
         <!-- <h1 class="title is-5" v-else style="text-align:center;">no hay imagen definida</h1> -->
        <!-- <img  :src="require(`../assets/${libro.imagen}`)" style="margin-right:auto;margin-left:auto;display:block;"> -->
    </div>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
    computed:{
        ...mapState(['libro']),
        ...mapState(['statusimage'])
    },
    data(){
        return{
            file:null,
        }
    },
    methods:{
        ...mapActions(['AddData']),
        ...mapActions(['UpdateData']),
        ...mapMutations(['CLEAR_DATA']),
        ...mapMutations(['TOGGLE_STATUS_IMAGE']),
        AñadirPedido(){
            console.log(this.libro.imagen)
            //recuerda enviar como dato en imagne
              //problema aqui de libro.imagen => variable indefinida
            //problema de añadir una nueva imagen constantemente
            const form = new FormData()
            form.append("authorlibro",this.libro.author)
            form.append("nombrelibro",this.libro.nombre)
            form.append("imagebook",this.libro.imagen)
            form.append("detalle",this.libro.detalle)
            if(this.libro.id !== ''){
                const param = {
                    form:form,
                    id:this.libro.id
                }
                this.UpdateData(param)
              this.Cancelar()
                    this.$swal('Buen Trabajo!',
                    'Ha sido Actualizado Correctamente!',
                    'success');
            }else{
                 this.AddData(form)
                  this.Cancelar()
                 this.$swal('Buen Trabajo!',
                    'Ha sido Creado Correctamente!',
                    'success');
            }
        },
        Cancelar(){
            this.TOGGLE_STATUS_IMAGE(true)
            this.CLEAR_DATA()
            this.$router.push("/ListPedido")
        },
        changeImage(e){
            //send file object 
            let files = e.target.files || e.dataTransfer.files
            if(!files.length){
                return 
            }
             this.TOGGLE_STATUS_IMAGE(true)
            this.libro.imagen = files[0]
            let reader = new FileReader()
            reader.onload = (e) =>{
                this.file = e.target.result
            }
                reader.readAsDataURL(files[0]);
        }
    },
     head:{
       //tema de SEO
         title:'Datos del Libro',
        meta:[
        {
            hid:'description',
            name:'Añadiendo Libros o Editando',
            content:'List Page Add Pedido'
        }
    ]
   }


}
</script>