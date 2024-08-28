const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const Post = require('./models/post')

app.use(express.urlencoded({ extended:true }))

app.use(express.json())

mongoose.connect('mongodb://localhost/cleanblog-test-db')

app.use(express.static('public'))
app.set('view engine', 'ejs')


app.get('/', async (req,res)=> {
    const posts = await (await Post.find({})).reverse()
    
    res.render('site/index', {posts})
})
app.get('/add-post', (req, res) => {
    res.render('site/add_post')
})
app.get('/about', (req, res) => {
    res.render('site/about')
})
app.get('/post', (req, res) => {
    res.render('site/post')
})

app.post('/new-post', async (req,res) => {
    await Post.create(req.body)
    res.redirect('/')
})

app.get('/posts/:id',async (req,res) => {
    const id = req.params.id
    const posts = await Post.find({_id: id})
    res.render('site/post.ejs', {posts})
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Server Basariyla Kuruldu")
})