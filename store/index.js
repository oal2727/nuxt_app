import Vuex from 'vuex'
import Book from './Api/Book'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      counter: 0,
      todo:'List',
      libros:[],
      libro:{id:'',author:'',nombre:'',imagen:'',detalle:''},
      statusimage:true,
    }),
    mutations: {
      increment(state) {
        state.counter++
      },
      GET_LIBROS(state,payload){
        state.libros=payload
      },
      ADD_LIBROS(state,payload){
        state.libros.push(payload)
      },
      DELETE_LIBRO(state,payload){
        const newData = state.libros.filter(item => {
          return payload._id !== item._id
        })
        state.libros=newData
      },
      CLEAR_DATA(state){
        state.libro.author=''
        state.libro.nombre=''
        state.libro.imagen=''
        state.libro.detalle=''
        state.libro.id=''
      },
      EDIT_LIBRO(state,payload){
        console.log("edit",payload)
        state.libro.author=payload.authorlibro
        state.libro.nombre=payload.nombrelibro
        state.libro.detalle=payload.detalle
        state.libro.imagen=payload.imageId
        state.libro.id=payload._id
      },
      UPDATE_LIBRO(state,payload){
        const newDato = state.libros.map(data => {
          return data._id === payload.id ? payload : data
        })
        state.libros=newDato
      },
      TOGGLE_STATUS_IMAGE(state,payload){
        state.statusimage=payload
      }
    },
    actions:{
      async AddData({commit},data){
        const options = {
          headers:{
           'Content-Type': 'multipart/form-data'
       }
      }
      return await this.$axios.$post("book",data,options).then(e=>{
        console.log(e)
        return commit('ADD_LIBROS',e)
        }) 
      },
      async GetLibros({commit}){
        const response = await this.$axios.$get("book")
        commit('GET_LIBROS',response)
      },
      async DeleteLibro({commit},id){
        console.log("delete data")
        const response = await this.$axios.$delete(`book/${id}`)
        commit('DELETE_LIBRO',response)
      },
      async UpdateData({commit},param){
        const options = {
          headers:{
           'Content-Type': 'multipart/form-data'
       }
      }
          await this.$axios.$put(`book/${param.id}`,param.form,options).then(e => {
            return commit("UPDATE_LIBRO",e)
          }).catch(err => {
            console.log('error',err)
          })
      }
    }
  })
}
// const response = await this.$axios.$get("book")
// console.log('libros',response)

export default createStore