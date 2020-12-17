import axios from 'axios'
export default{
    PostData(){
        return this.$axios.$post("books")
    },
    GetData(){
        return this.$axios.$get("book")
    }

}