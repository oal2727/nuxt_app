const {Router} = require('express')
const router = Router()
const { v4: uuidv4 } = require('uuid');
const path = require("path")
const multer = require("multer")
const Book = require("../models/Book")
const fs = require("fs-extra")

const storage = multer.diskStorage({
    destination:path.join(__dirname,'../../assets'),
    filename:(req,file,cb)=>{
         cb(null, uuidv4()+ path.extname(file.originalname));
    }
})

// app.use(multer({storage:storage}).single("imagebook"))
const upload = multer({storage:storage}).single("imagebook")


//usando el middleware upload doy uso de form/data
router.post("/book",upload,async(req,res)=>{
    const {authorlibro,nombrelibro,detalle} = req.body
    console.log(req.file)
    try{
        const book = new Book({
            authorlibro,
            nombrelibro,
            imageId:req.file.filename,
            detalle
        })
        await book.save()
        console.log("resultado " + book);
        return res.status(200).json(book)
    }catch(err){
        console.log(err)
    }
})
router.get('/book',async(req,res)=>{
     try{
        const book = await Book.find()
        console.log(book)
        return res.status(200).json(book)
     }catch(err){
         return res.status(400).json(err)
     }
})

router.delete('/book/:id',async(req,res)=>{
    try{
        const _id = req.params.id
        const data = await Book.findByIdAndDelete(_id)
        fs.unlink(path.join(__dirname,`../../assets/${data.imageId}`))
        return res.status(200).json(data)
    }catch(err){
        return res.status(400).json(err)
    }
})
router.put("/book/:id",upload,async(req,res)=>{
    const {authorlibro,nombrelibro,detalle} = req.body
    const _id = req.params.id
    try{
        const datobook = await Book.findById(_id)
        let fileid
        if(fs.existsSync(path.join(__dirname,`../../assets/${req.body.imagebook}`))){
            console.log("existe archivo no actualiza imagen")
            fileid=req.body.imagebook
        }else{
            console.log("no existe archivo creando")
            await fs.unlink(path.join(__dirname,`../../assets/${datobook.imageId}`))
            fileid=req.file.filename
        }
        // console.log("eliminando imagen",datobook.imageId)
        const param={
            authorlibro:authorlibro,
            nombrelibro:nombrelibro,
            imageId:fileid,
            detalle:detalle
        }
        // console.log('data param',param)
        console.log('ip',_id)
        const data = await Book.findByIdAndUpdate(_id,param,{new:true})
        return res.status(200).json(data)
    }catch(err){
        return res.status(400).json(err)
    }
})

module.exports = router


