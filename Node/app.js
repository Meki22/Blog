const express =require('express');
const morgan = require('morgan');
const mongoose= require('mongoose');
const Blog = require('./modles/blogs');
const app = express();
const dbURI= 'mongodb+srv://user:user1234@nodeprac.picrnrf.mongodb.net/node1?retryWrites=true&w=majority';
mongoose.connect(dbURI ,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=>console.log('connected to db'))
.catch((err) => console.log(err));

app.set('view engine','ejs');
app.use(morgan('dev'));

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });
  blog.save()
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
});




app.get('/',(req,res)=>{
   // res.send('<p>home page</p>');
  //  res.sendFile('./docs/index.html',{root:__dirname});
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index',{title:'home',blogs});
});

app.get('/about',(req,res)=>{
    // res.send('<p>about page</p>');
    // res.sendFile('./docs/about.html',{root:__dirname});
    res.render('about',{title:'about'});
    
});
app.get('/blogs/create',(req,res)=>{
  res.render('create',{title:'create new blog'});
});
app.use((req,res)=>{
  // res.status(404).sendFile('./docs/404.html',{root:__dirname});
  res.render('404',{title:'404'});
})