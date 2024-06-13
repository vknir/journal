import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app= express()
const port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))




mongoose.connect('mongodb+srv://2005975:1meJSbinEWln11wm@cluster0.sfxroxp.mongodb.net/blogDB')
const postSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,
    },
    content : {
        type : String,
        required: true,
    }
})

const postModel = mongoose.model('post', postSchema)



app.get("/",async(req,res)=>{
    const result = await postModel.find();
    // console.log(result);
    res.render("index.ejs",{posts : result});
})


app.get("/compose", async (req, res)=>{
    res.render("compose.ejs");
})

app.get("/posts/:_id", async(req, res)=>{
    const id= (req.params._id)
    const result = await postModel.findById(id);
    console.log(result)
})


app.post("/compose",async(req, res)=>{
    // console.log(req.body)
    await postModel.create( {
        title : `${req.body.title}`,
        content : `${req.body.content}`
    })
    res.redirect("/")
})



app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

