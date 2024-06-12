import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app= express()
const port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))


const days=["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old"
]

mongoose.connect('mongodb://127.0.0.1:27017/blogDB')
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

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

