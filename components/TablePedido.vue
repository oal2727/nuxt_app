<template>
    <table class="table table-bordered" style="width:300px;">
        <thead>
            <td>N° </td>
            <td>Nombre</td>
            <td>Precio</td>
        </thead>
        <tbody v-for="pedido in pedidos" :key="pedido.id">
            <td>{{pedido.id}}</td>
            <td>{{pedido.nombre}}</td>
            <td>{{pedido.precio}}</td>
        </tbody>
    </table>
</template>
<script>
export default {
    props:{
       pedidos:{
           type:Array,
       }
    },
    name:'table-pedido'
}
</script>