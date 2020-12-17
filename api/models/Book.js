var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const BookSchema = new Schema({
    authorlibro:String,
    nombrelibro:String,
    imageId:String,
    detalle:String,
    created_at:{type:Date,default:Date.now()}
})

const Books = mongoose.model('books',BookSchema)
module.exports= Books
// module.exports = mongoose.model('books',BookSchema)